import { Application } from '@/application/application.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity()
export class User extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];
}
