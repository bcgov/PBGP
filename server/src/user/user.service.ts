import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '@/common/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getByExternalId(externalId: string): Promise<User> {
    return this.userRepository.findOne({ where: { externalId } });
  }

  async addUser(data: Partial<User>): Promise<User> {
    return this.userRepository.save(this.userRepository.create(data));
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.createQueryBuilder().limit(50).getMany();
  }

  async updateUser(userId: string, body: UserDto): Promise<void> {
    const user = this.userRepository.findOne(userId);

    if (user) {
      // Right now only updates isAuthorized and isAdmin, add more in the future as needed.
      try {
        await this.userRepository
          .createQueryBuilder()
          .update(User)
          .set({ isAuthorized: body.isAuthorized, isAdmin: body.isAdmin })
          .where('id = :id', { id: userId })
          .execute();
      } catch (e) {
        Logger.error(e);
      }
    }
  }
}
