import { Application } from '../../application/application.entity';
import { Repository } from 'typeorm';
import { SyncChefsDataService } from './sync-chefs-data.service';

(async () => {
  const syncChefsDataService = new SyncChefsDataService(new Repository<Application>());

  syncChefsDataService.syncChefsData();
})();
