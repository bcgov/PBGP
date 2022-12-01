import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserAccessDto } from '../common/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getByExternalId(externalId: string): Promise<User> {
    return this.userRepository.findOne({ where: { externalId } });
  }

  async getUser(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async addUser(data: Partial<User>): Promise<User> {
    return this.userRepository.save(this.userRepository.create(data));
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.createQueryBuilder().limit(50).getMany();
  }

  async updateUserAccess(userId: string, body: UserAccessDto): Promise<void> {
    const user = await this.userRepository.findOne(userId);

    if (user) {
      // Right now only updates isAuthorized and isAdmin, add more in the future as needed.
      await this.userRepository.save({ ...user, ...body });
    }
  }
}
