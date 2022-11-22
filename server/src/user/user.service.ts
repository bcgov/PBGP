import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

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
}
