import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async getUser(payload: JwtPayload): Promise<User> {
    const { idir_user_guid, display_name, idir_username } = payload;
    let user = await this.userService.getByExternalId(idir_user_guid);

    if (!user) {
      user = await this.userService.addUser({
        externalId: idir_user_guid,
        displayName: display_name,
        userName: idir_username,
      });
    }

    return user;
  }
}
