import { Injectable } from '@nestjs/common';

const fs = require('fs');
const path = require('path');
// const puppeteer = require('puppeteer'); // Puppeteer blows up docker :(
// const handlebars = require('handlebars');

@Injectable()
export class WorkshopToPdfService {
  HTML_TEMPLATE_FILE_PATH: string;
  constructor() {
    this.HTML_TEMPLATE_FILE_PATH = 'public/workshop-score-pdf-template.html';
  }

  async workshopDataToPdf(): Promise<void> {
    const templateHtml = fs.readFileSync(
      path.join(process.cwd(), this.HTML_TEMPLATE_FILE_PATH),
      'utf8'
    );
    console.log(templateHtml);
  }
}
