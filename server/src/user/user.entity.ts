import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity()
export class User extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  userName: string;

  @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
  displayName: string;

  @Index()
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  externalId: string;
}
