import { Entity, Column, PrimaryColumn, VersionColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity({
  name: 'pbgp_attachment',
})
export class Attachment extends CustomBaseEntity {
  @PrimaryColumn({ name: 'attachment_id', type: 'varchar', length: '100', nullable: false })
  id: string;

  @VersionColumn()
  version: number;

  @Column({ type: 'varchar', length: '200', nullable: false, unique: true })
  url: string;

  // nullable for now
  // String doesn't work for AxiosResponse type
  @Column({ type: 'bytea', nullable: true })
  data: Buffer;

  @Column({ type: 'varchar', length: '200', nullable: false })
  originalName: string;
}
