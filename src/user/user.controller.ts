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
import { UpdateUserStatementDto } from './dto/update-user-statement.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly statementService: UserService,
  ) {}

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
  async create(
    @Param('userId') userId: string,
    @Body() dto: CreateUserStatementDto,
  ) {
    return this.statementService.createStatement(userId, dto);
  }

  // GET ALL
  @Get(':userId/statements')
  async getByUserId(@Param('userId') userId: string) {
    return this.statementService.getStatementsByUserId(userId);
  }

  // UPDATE statement by ID + email
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() dto: Partial<CreateUserStatementDto>,
  ) {
    return this.statementService.updateStatement(id, userId, dto);
  }
}
