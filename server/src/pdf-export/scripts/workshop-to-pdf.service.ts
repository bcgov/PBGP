import { Injectable } from '@nestjs/common';

const fs = require('fs');
const path = require('path');
// const puppeteer = require('puppeteer'); // Puppeteer blows up docker :(
const handlebars = require('handlebars');

@Injectable()
export class WorkshopToPdfService {
  HTML_TEMPLATE_FILE_PATH: string;
  SAMPLE_DATA_PATH: string;
  WORKSHOP_DATA: object;
  constructor() {
    this.HTML_TEMPLATE_FILE_PATH = 'public/workshop-score-pdf-template.html';
    this.SAMPLE_DATA_PATH = 'public/sample-workshop-data.json';
    this.WORKSHOP_DATA = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), this.SAMPLE_DATA_PATH), 'utf8')
    );
  }

  async workshopDataToPdf(): Promise<void> {
    const templateHtml = fs.readFileSync(
      path.join(process.cwd(), this.HTML_TEMPLATE_FILE_PATH),
      'utf8'
    );

    var template = handlebars.compile(templateHtml);
    var html = template(this.WORKSHOP_DATA);
    console.log(html);
  }
}
