import { Application } from '../application/application.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity({
  name: 'pbgp_form_metadata',
})
export class FormMetaData extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'form_metadata_id' })
  id: string;

  @Column({ type: 'varchar', length: '200', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: '2000', nullable: false, default: '' })
  description: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  active: boolean;

  @Column({ type: 'varchar', length: '100', nullable: false })
  chefsFormId: string;

  @OneToMany(() => Application, (application) => application.form)
  applications: Application[];
}
