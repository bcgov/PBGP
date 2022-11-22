import { UserDto } from '@/common/dto/user.dto';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRoles } from '../common/constants';
import { Roles } from '../common/decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('users')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Patch('/:id')
  updateUser(@Param('id') userId: string, @Body() body: UserDto): Promise<void> {
    return this.userService.updateUser(userId, body);
  }
}
