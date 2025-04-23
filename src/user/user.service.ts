import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException('Email already exist');
    }
    const existUsername = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (existUsername) {
      throw new ConflictException('Username already exist');
    }

    // Generate a unique verification token
    // const verificationToken = uuidv4();

    // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,

      isActive: false,
      //   verificationToken: verificationToken,
    });
    await createdUser.save();

    // Send the verification email
    // const verificationLink = `https://store-management-seven.vercel.app/verify-email?token=${verificationToken}`;
    // await this.emailService.sendVerificationEmail(
    //   createUserDto.email,
    //   verificationLink,
    // );

    return { message: 'Successfully registered' };
  }

  async login(loginDto: LoginUserDto): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email: loginDto.email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = loginDto.password === user.password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.isActive != 'Active') {
      throw new UnauthorizedException('Account Not Active!!! Contact Support');
    }

    // Here you can generate and return a JWT or a session if needed
    return { message: 'Login successful' };
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUsername = await this.userModel.findOne({
        username: updateUserDto.username,
      });
      if (existingUsername) {
        throw new ConflictException('Username already exists');
      }
    }

    Object.assign(user, updateUserDto); // update fields
    await user.save();

    return { message: 'User updated successfully' };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
