import { AppModule } from '../../app.module';
import { NestFactory } from '@nestjs/core';
import { WorkshopToPdfService } from './workshop-to-pdf.service';

(async () => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const workshopToPdfService = appContext.get(WorkshopToPdfService);
  workshopToPdfService.workshopDataToPdf();
})();
