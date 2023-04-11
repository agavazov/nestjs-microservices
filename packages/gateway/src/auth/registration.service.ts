import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user';

@Injectable()
export class RegistrationService {
  protected usersDb: User[] = [];

  createUser(userData: User) {
    this.usersDb.push(userData);

    return userData;
  }
}
