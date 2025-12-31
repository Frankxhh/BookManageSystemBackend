import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async register(registerUserDto: RegisterUserDto) {
    const db = await this.dbService.getDb();
    const user = db.find((user: User) => user.username === registerUserDto.username);
    if (user) {
      throw new BadRequestException('用户已存在');
    }
    await this.dbService.setDb(registerUserDto);
    return null;
  }

  async login(loginUserDto: RegisterUserDto) {
    const db = await this.dbService.getDb();
    const user = db.find((user: User) => user.username === loginUserDto.username);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    return user;
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
