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
import { extractObjects, getGenericError } from '../../common/utils';
import { AttachmentService } from '../../attachments/attachment.service';
import { Attachment } from '../../attachments/attachment.entity';
import { AxiosResponseTypes, SyncTypes } from '../../common/enums';
import { GenericException } from '@/common/generic-exception';
import { DatabaseError } from '../database.error';

// CHEFS Constants
// const CHEFS_FORM_IDS = [
//   'ae20a4c4-72cb-4562-9d54-3e781dcc68f5',
//   '096d8f86-f604-490e-ac15-c548910e3097',
//   'b723cb59-334d-4372-9a8c-212d55b3cdc3',
//   'bb0871ca-516f-42ed-91e6-3f8175d18448',
// ];

const CHEFS_FORM_IDS = ['4b19eee6-f42d-481f-8279-cbc28ab68cf0'];
const CHEFS_BASE_URL = 'https://submit.digital.gov.bc.ca/app/api/v1';
const FILE_URL = 'https://submit.digital.gov.bc.ca';

@Injectable()
export class SyncChefsDataService {
  CHEFS_FORM_IDS: string[];
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
    @InjectRepository(FormMetaData)
    private readonly formMetadataRepo: Repository<FormMetaData>,
    private readonly appService: ApplicationService,
    private readonly attachmentService: AttachmentService
  ) {
    this.CHEFS_FORM_IDS = JSON.parse(process.env.CHEFS_FORM_IDS);
  }

  private getFormUrl(formId: string): string {
    return `${CHEFS_BASE_URL}/forms/${formId}/submissions`;
  }
  private getSubmissionUrl(submissionId: string): string {
    return `${CHEFS_BASE_URL}/submissions/${submissionId}`;
  }

  private async createOrFindFormMetadate(data: FormMetaDataDto): Promise<FormMetaData> {
    const form = await this.formMetadataRepo.findOne({
      where: { chefsFormId: data.chefsFormId, versionId: data.versionId },
    });
    if (form) {
      Logger.log('FormMetaData exists: fetching');
      return form;
    }
    Logger.log("FormMetaData doesn't exist: creating");
    return await this.formMetadataRepo.save(this.formMetadataRepo.create(data));
  }

  private getTokenFromArgs(args: string[]) {
    if (args[3] && args[3].includes('token=')) {
      const parts = args[3].split('=');
      if (parts[0]) {
        if (parts[1]) {
          return parts[1];
        }
      }
    }
    throw new GenericException(DatabaseError.TOKEN_NOT_FOUND);
  }

  private getSubmissionIdsFromArgs(args: string[]) {
    if (args[4] && args[4].includes('submissionIds=')) {
      const parts = args[4].split('=');
      if (parts[0]) {
        if (parts[1]) {
          return parts[1].split(',').filter((arr) => arr.length > 0);
        }
      }
    }
    return [];
  }

  async updateAttachments() {
    // Axios stuff
    const method = REQUEST_METHODS.GET;
    // Make sure you include the -- token=<token> into the script args
    const token = this.getTokenFromArgs(process.argv);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const responseType = AxiosResponseTypes.ARRAY_BUFFER;
    const options = {
      method,
      headers,
      responseType,
    };
    const files = await this.attachmentService.getAllAttachments(false);

    for (const file of files) {
      try {
        Logger.log(`Fetching attachment - ${file.id}`);
        // Get file data form server
        const url = FILE_URL + file.url;
        const fileRes = await axios({ ...options, url });
        const fileData = Buffer.from(fileRes.data);

        await this.attachmentService.updateAttachment({ ...file, data: fileData });
      } catch (error) {
        Logger.error(
          `Error occured fetching attachment - ${file.id} - `,
          JSON.stringify(getGenericError(error))
        );
      }
    }
  }

  private async createOrUpdateAttachments(data) {
    const responseDataFileArrays = Object.values(data).filter(
      (value) => Array.isArray(value) && value.length > 0
    );
    const objects = extractObjects(responseDataFileArrays, 5);
    // TODO:
    // Maybe there's a better way to check it
    const files = objects.filter((obj) => 'url' in obj && 'data' in obj);

    files.forEach(async (file) => {
      const newAttachmentData = {
        id: file.data.id,
        url: file.url,
        originalName: file.originalName,
      } as Attachment;

      await this.attachmentService.createOrUpdateAttachment(newAttachmentData);
    });
  }

  private async createOrUpdateSubmission(
    submissionId: string,
    axiosOptions: AxiosOptions
  ): Promise<void> {
    try {
      const submissionResponse = await axios(axiosOptions);
      const responseData = submissionResponse.data.submission;
      const dbSubmission = await this.applicationRepo.findOne({
        where: { submissionId: submissionId },
      });

      // Process attachments
      this.createOrUpdateAttachments(responseData.submission.data);

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
          versionId: submissionResponse.data.version.id,
          versionSchema: submissionResponse.data.version.schema,
        };
        const formMetaData = await this.createOrFindFormMetadate(newFormData);

        await this.appService.createApplication(newSubmissionData, formMetaData);
      }
    } catch (e) {
      Logger.error(
        `Error occured fetching submission - ${submissionId} - `,
        JSON.stringify(getGenericError(e))
      );
    }
  }

  async syncChefsData(syncType: SyncTypes): Promise<void> {
    const method = REQUEST_METHODS.GET;

    const token = this.getTokenFromArgs(process.argv);
    const headers = {
      'Content-Type': 'application/x-www-formid-urlencoded',
      Authorization: `Bearer ${token}`,
    };

    CHEFS_FORM_IDS.forEach(async (formId) => {
      const options = {
        method,
        headers,
      };

      try {
        const formResponse = await axios({ ...options, url: this.getFormUrl(formId) });

        const submissionIdsFromArgs = this.getSubmissionIdsFromArgs(process.argv);
        const submissionIdsFromForm = formResponse.data
          .filter((submission) => submission.formSubmissionStatusCode === 'SUBMITTED')
          .map((submission) => submission.submissionId);

        let submissionIds: string[];
        if (syncType === SyncTypes.SUBMISSIONS) {
          submissionIds = submissionIdsFromForm.filter((submissionId) =>
            submissionIdsFromArgs.includes(submissionId)
          );
        } else {
          submissionIds = submissionIdsFromForm;
        }

        if (submissionIds && submissionIds.length > 0) {
          submissionIds.forEach((submissionId) => {
            this.createOrUpdateSubmission(submissionId, {
              ...options,
              url: this.getSubmissionUrl(submissionId),
            });
          });
        } else {
          Logger.log(
            `No submissions with ID's ${submissionIdsFromArgs} found in the form with ID ${formId}. \nSkipping...`
          );
          return;
        }
      } catch (e) {
        Logger.error(
          `Error occured fetching form - ${formId} - `,
          JSON.stringify(getGenericError(e))
        );
      }
    });
  }
}
