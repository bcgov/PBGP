import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from '../../application/application.entity';
import { REQUEST_METHODS } from '../../common/constants';
import { ApplicationService } from '../../application/application.service';
import { SaveApplicationDto } from '../../common/dto/save-application.dto';
import { ReviewStatuses } from '../../common/enums';
import { AxiosOptions } from '../../common/interfaces';

// CHEFS Constants
const CHEFS_FORM_IDS = ['4b19eee6-f42d-481f-8279-cbc28ab68cf0'];
const CHEFS_BASE_URL = 'https://submit.digital.gov.bc.ca/app/api/v1';

@Injectable()
export class SyncChefsDataService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
    private readonly appService: ApplicationService
  ) {}

  private getFormUrl(formId: string): string {
    return `${CHEFS_BASE_URL}/forms/${formId}/submissions`;
  }
  private getSubmissionUrl(submissionId: string): string {
    return `${CHEFS_BASE_URL}/submissions/${submissionId}`;
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
      assignedTo: null,
      status: ReviewStatuses.INITIAL_REVIEW,
    };

    if (dbSubmission) {
      // Update
      Logger.log('Submission exists: updating');
      await this.appService.updateApplication(dbSubmission.id, newSubmissionData);
    } else {
      // Create
      Logger.log("Submission doesn't exist: creating");

      // Create FormMetaData as well later, then pass the ID to the application
      await this.appService.createApplication(newSubmissionData);
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
