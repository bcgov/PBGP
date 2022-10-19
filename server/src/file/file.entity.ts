import { Application } from '@/application/application.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity()
export class File extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'bytea', nullable: false })
  file: string;

  @ManyToOne(() => Application, (application) => application.files)
  application: Application;
}
