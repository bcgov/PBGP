import { Entity, Column, PrimaryColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity({
  name: 'pbgp_attachment',
})
export class Attachment extends CustomBaseEntity {
  @PrimaryColumn({ name: 'attachment_id', type: 'varchar', length: '100', nullable: false })
  id: string;

  @Column({ type: 'varchar', length: '200', nullable: false, unique: true })
  url: string;

  // nullable for now
  @Column({ type: 'bytea', nullable: true })
  data: string;
}
