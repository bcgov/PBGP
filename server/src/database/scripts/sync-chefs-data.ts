import { SyncChefsDataService } from './sync-chefs-data.service';
import { AppModule } from '../../app.module';
import { NestFactory } from '@nestjs/core';

(async () => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const syncChefsDataService = appContext.get(SyncChefsDataService);

  syncChefsDataService.syncChefsData();
})();
