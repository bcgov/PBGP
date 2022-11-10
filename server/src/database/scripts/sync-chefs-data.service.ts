import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from '../../application/application.entity';
import { CHEFS_BASE_URL, CHEFS_FORM_IDS, REQUEST_METHODS } from '../../common/constants';
import { ApplicationService } from '@/application/application.service';
import { SaveApplicationDto } from '@/common/dto/save-application.dto';
import { ReviewStatuses } from '@/common/enums';

@Injectable()
export class SyncChefsDataService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>
  ) {}

  private getFormUrl(form) {
    return `${CHEFS_BASE_URL}/forms/${form}/submissions`;
  }
  private getSubmissionUrl(submission) {
    return `${CHEFS_BASE_URL}/submissions/${submission}`;
  }

  async syncChefsData(): Promise<void> {
    for (const form of CHEFS_FORM_IDS) {
      const auth = {
        username: form,
        password: process.env.CHEFS_FORM_API_KEY,
      };

      const method = REQUEST_METHODS.GET;
      const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      const options = {
        method,
        headers,
        auth,
      };

      try {
        const formResponse = await axios({ ...options, url: this.getFormUrl(form) });
        const submissionIds = formResponse.data.map((submission) => submission.submissionId);

        for (const submission of submissionIds) {
          const submissionResponse = await axios({
            ...options,
            url: this.getSubmissionUrl(submission),
          });
          const responseData = submissionResponse.data.submission;
          const dbSubmission = await this.applicationRepo.findOne({
            where: { submissionId: submission },
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
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
