import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Get,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserStatementDto } from './dto/create-user-statement.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Patch('/update-user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Get('/all-users')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post(':userId/create-statement')
  async createStatement(
    @Param('userId') userId: string,
    @Body() dto: CreateUserStatementDto,
  ) {
    return this.userService.createStatement(userId, dto);
  }

  @Get(':userId/statements')
  async getByUserId(
    @Param('userId') userId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 50;

    return this.userService.getStatementsByUserId(
      userId,
      pageNumber,
      limitNumber,
    );
  }

  @Patch(':userId/statements/:statementId')
  async updateStatement(
    @Param('userId') userId: string,
    @Param('statementId') statementId: string,
    @Body() updateDto: Partial<CreateUserStatementDto>,
  ) {
    return this.userService.updateStatement(statementId, userId, updateDto);
  }
}
