import { Application } from '../application/application.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';
import { User } from '../user/user.entity';

@Entity({
  name: 'pbgp_comment',
})
export class Comment extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  id: string;

  @VersionColumn()
  version: number;

  @Column({ type: 'varchar', length: 2000, nullable: false })
  comment: string;

  @ManyToOne(() => Application, (application) => application.comments)
  application: Application;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
