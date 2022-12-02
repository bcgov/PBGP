import { Application } from '@/application/application.entity';
import { User } from '@/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity({
  name: 'pbgp_comment',
})
export class Comment extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  id: string;

  @Column({ type: 'varchar', length: 2000, nullable: false })
  comment: string;

  @ManyToOne(() => Application, (application) => application.comments)
  application: Application;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
