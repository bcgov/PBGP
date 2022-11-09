import { User } from '../user/user.entity';

export interface JwtPayload {
  scope: string;
  idir_user_guid: string;
  identity_provider: string;
  idir_username: string;
  email_verified: false;
  name: string;
  given_name: string;
  display_name: string;
  family_name: string;
  email: string;
  client_roles: string[];
  user: User;
}
