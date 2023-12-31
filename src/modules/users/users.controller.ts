import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  public async create(createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'allUsers' })
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'findUser' })
  findOne(email: string) {
    return this.usersService.findOne(email);
  }

  @MessagePattern({ cmd: 'editUser' })
  async update(data: { email: string; updateUserDto: UpdateUserDto }) {
    return await this.usersService.update(data.email, data.updateUserDto);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  async remove(email: string) {
    return await this.usersService.remove(email);
  }
}
