import { Application } from '@/application/application.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity()
export class User extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  externalId: string;

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];
}
