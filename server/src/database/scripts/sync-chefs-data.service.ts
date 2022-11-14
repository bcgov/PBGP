import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from '../../application/application.entity';
import { REQUEST_METHODS } from '../../common/constants';
import { ApplicationService } from '@/application/application.service';
import { SaveApplicationDto } from '@/common/dto/save-application.dto';
import { ReviewStatuses } from '@/common/enums';

// CHEFS Constants
const CHEFS_FORM_IDS = ['4b19eee6-f42d-481f-8279-cbc28ab68cf0'];
const CHEFS_BASE_URL = 'https://submit.digital.gov.bc.ca/app/api/v1';

@Injectable()
export class SyncChefsDataService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application> // private readonly appService: ApplicationService = new ApplicationService(applicationRepo)
  ) {}

  private getFormUrl(formId: string): string {
    return `${CHEFS_BASE_URL}/forms/${formId}/submissions`;
  }
  private getSubmissionUrl(submissionId: string): string {
    return `${CHEFS_BASE_URL}/submissions/${submissionId}`;
  }

  async syncChefsData(): Promise<void> {
    const method = REQUEST_METHODS.GET;
    const headers = { 'Content-Type': 'application/x-www-formid-urlencoded' };

    for (const formid of CHEFS_FORM_IDS) {
      const auth = {
        username: formid,
        password: process.env.CHEFS_FORM_API_KEY,
      };
      const options = {
        method,
        headers,
        auth,
      };

      try {
        const formResponse = await axios({ ...options, url: this.getFormUrl(formid) });
        const submissionIds = formResponse.data.map((submission) => submission.submissionId);

        for (const submissionid of submissionIds) {
          try {
            const submissionResponse = await axios({
              ...options,
              url: this.getSubmissionUrl(submissionid),
            });
            const responseData = submissionResponse.data.submission;
            const dbSubmission = await this.applicationRepo.findOne({
              where: { submissionId: submissionid },
            });
            const appService = new ApplicationService(this.applicationRepo);

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
              console.log('Submission exists: updating');
              await appService.updateApplication(dbSubmission.id, newSubmissionData);
            } else {
              // Create
              console.log("Submission doesn't exist: creating");
              // Create FormMetaData as well later, then pass the ID to the application
              await appService.createApplication(newSubmissionData);
            }
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
