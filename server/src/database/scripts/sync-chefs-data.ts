import { ActionExecutionStatus } from 'aws-sdk/clients/codepipeline';
import axios from 'axios';

// Move these constants later
const API_KEY = 'd633771f-924c-41ea-a15f-f376c6f489ce';
const form1 = '4b19eee6-f42d-481f-8279-cbc28ab68cf0';
const forms = [form1];
const baseUrl = 'https://submit.digital.gov.bc.ca/app/api/v1';
const getFormUrl = (form) => `${baseUrl}/forms/${form}/submissions`;
const getSubmissionUrl = (submission) => `${baseUrl}/submissions/${submission}`;
// Without this, method: 'GET' will not work, type incompatibility. Silly.
enum HTTPMethods {
  GET = 'GET',
}

// ------------------------------------------------------

(async () => {
  for (const form of forms) {
    const auth = {
      username: form,
      password: API_KEY,
    };

    const method = HTTPMethods.GET;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const options = {
      method,
      headers,
      auth,
    };

    try {
      const formResponse = await axios({ ...options, url: getFormUrl(form) });
      const submissionIds = formResponse.data.map((submission) => submission.submissionId);

      for (const submission of submissionIds) {
        const submissionResponse = await axios({ ...options, url: getSubmissionUrl(submission) });
        console.log(submissionResponse.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
})();
