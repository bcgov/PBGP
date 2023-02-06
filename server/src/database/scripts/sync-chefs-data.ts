import { SyncChefsDataService } from './sync-chefs-data.service';
import { AppModule } from '../../app.module';
import { NestFactory } from '@nestjs/core';
import { SyncTypes } from '../../common/enums';

(async () => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const syncChefsDataService = appContext.get(SyncChefsDataService);
  switch (process.env.SYNC_TYPE) {
    case SyncTypes.ATTACHMENTS:
      syncChefsDataService.updateAttachments();
      break;
    case SyncTypes.SUBMISSIONS:
      syncChefsDataService.syncSubmissions();
      break;
    case SyncTypes.SOFT_DELETE:
      syncChefsDataService.softDeleteApplications();
      break;
    default:
      syncChefsDataService.syncChefsData();
      break;
  }
})();
