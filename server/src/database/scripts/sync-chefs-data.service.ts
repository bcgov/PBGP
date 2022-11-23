import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from '../../application/application.entity';
import { REQUEST_METHODS } from '../../common/constants';
import { ApplicationService } from '../../application/application.service';
import { SaveApplicationDto } from '../../common/dto/save-application.dto';
import { AxiosOptions } from '../../common/interfaces';
import { FormMetaData } from '../../FormMetaData/formmetadata.entity';
import { FormMetaDataDto } from '../../common/dto/form-metadata.dto';

// CHEFS Constants
const CHEFS_FORM_IDS = ['4b19eee6-f42d-481f-8279-cbc28ab68cf0'];
const CHEFS_BASE_URL = 'https://submit.digital.gov.bc.ca/app/api/v1';

@Injectable()
export class SyncChefsDataService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
    @InjectRepository(FormMetaData)
    private readonly formMetadataRepo: Repository<FormMetaData>,
    private readonly appService: ApplicationService
  ) {}

  private getFormUrl(formId: string): string {
    return `${CHEFS_BASE_URL}/forms/${formId}/submissions`;
  }
  private getSubmissionUrl(submissionId: string): string {
    return `${CHEFS_BASE_URL}/submissions/${submissionId}`;
  }

  private async createOrFindFormMetadate(data: FormMetaDataDto): Promise<FormMetaData> {
    const form = await this.formMetadataRepo.find({ chefsFormId: data.chefsFormId });
    if (form && form[0]) {
      Logger.log('FormMetaData exists: fetching');
      return form[0];
    }
    Logger.log("FormMetaData doesn't exist: creating");
    return await this.formMetadataRepo.save(this.formMetadataRepo.create(data));
  }

  private async createOrUpdateSubmission(
    submissionId: string,
    axiosOptions: AxiosOptions
  ): Promise<void> {
    const submissionResponse = await axios(axiosOptions);
    const responseData = submissionResponse.data.submission;
    const dbSubmission = await this.applicationRepo.findOne({
      where: { submissionId: submissionId },
    });

    const newSubmissionData: SaveApplicationDto = {
      submissionId: responseData.id,
      submission: responseData.submission.data,
      confirmationId: responseData.confirmationId,
      facilityName: responseData.submission.data.facilityName,
      projectTitle: responseData.submission.data.projectTitle,
      totalEstimatedCost: responseData.submission.data.totalEstimatedCostOfProject,
      asks: responseData.submission.data.totalRequestBeingMadeOfBcaapACDNotToExceedB,
    };

    if (dbSubmission) {
      Logger.log('Submission exists: updating');
      await this.appService.updateApplication(dbSubmission.id, newSubmissionData);
    } else {
      Logger.log("Submission doesn't exist: creating");

      Logger.log('Processing FormMetadata');
      const newFormData: FormMetaDataDto = {
        name: submissionResponse.data.form.name,
        description: submissionResponse.data.form.description,
        active: submissionResponse.data.form.active,
        chefsFormId: submissionResponse.data.form.id,
      };
      const formMetaData = await this.createOrFindFormMetadate(newFormData);

      await this.appService.createApplication(newSubmissionData, formMetaData);
    }
  }

  async syncChefsData(): Promise<void> {
    const method = REQUEST_METHODS.GET;
    const headers = { 'Content-Type': 'application/x-www-formid-urlencoded' };

    for (const formId of CHEFS_FORM_IDS) {
      const auth = {
        username: formId,
        password: process.env.CHEFS_FORM_API_KEY,
      };
      const options = {
        method,
        headers,
        auth,
      };

      try {
        const formResponse = await axios({ ...options, url: this.getFormUrl(formId) });
        const submissionIds = formResponse.data
          .filter((submission) => submission.formSubmissionStatusCode === 'SUBMITTED')
          .map((submission) => submission.submissionId);

        for (const submissionId of submissionIds) {
          try {
            this.createOrUpdateSubmission(submissionId, {
              ...options,
              url: this.getSubmissionUrl(submissionId),
            });
          } catch (e) {
            Logger.error(e);
          }
        }
      } catch (e) {
        Logger.error(e);
      }
    }
  }
}
