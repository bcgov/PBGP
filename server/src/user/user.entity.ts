import { Application } from '@/application/application.entity';
import { Comment } from '@/comments/comment.entity';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity({
  name: 'pbgp_user',
})
export class User extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  userName: string;

  @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
  displayName: string;

  @Index()
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  externalId: string;

  @Column({ type: 'bool', default: false })
  isAuthorized: boolean;

  @Column({ type: 'bool', default: false })
  isAdmin: boolean;

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];

  @ManyToOne(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
