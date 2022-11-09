import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from '../../application/application.entity';
import { CHEFS_BASE_URL, CHEFS_FORM_IDS, REQUEST_METHODS } from '../../common/constants';

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
          console.log(submissionResponse.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
