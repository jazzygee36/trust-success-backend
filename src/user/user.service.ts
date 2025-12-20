import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserStatementDto } from './dto/create-user-statement.dto';
import { UpdateUserStatementDto } from './dto/update-user-statement.dto';
import { UserStatement } from './schemas/statement';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,

    @InjectModel(UserStatement.name)
    private readonly statementModel: Model<UserStatement>,
  ) {}

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

  async createStatement(
    userId: string,
    createDto: CreateUserStatementDto,
  ): Promise<{ message: string; statement: UserStatement }> {
    if (!userId || !Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid userId');
    }

    const statement = new this.statementModel({
      ...createDto,
      userId: new Types.ObjectId(userId), // link to userId
    });

    const savedStatement = await statement.save();

    return {
      message: 'Statement created successfully',
      statement: savedStatement,
    };
  }

  // Get all statements for a specific user (with optional pagination)
  async getStatementsByUserId(
    userId: string,
    page = 1,
    limit = 50,
  ): Promise<{
    statements: UserStatement[];
    total: number;
    page: number;
    limit: number;
  }> {
    if (!userId || !Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid userId');
    }

    const skip = (page - 1) * limit;

    // Fetch total count for pagination info
    const total = await this.statementModel.countDocuments({
      userId: new Types.ObjectId(userId),
    });

    // Fetch paginated statements
    const statements = await this.statementModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit)
      .lean() // return plain JS objects → much lighter in memory
      .exec();

    return { statements, total, page, limit };
  }
  // Update a statement, only if it belongs to the user

  async deleteStatement(statementId: string): Promise<{ message: string }> {
    if (!statementId || !Types.ObjectId.isValid(statementId)) {
      throw new BadRequestException('Invalid statementId');
    }

    const deleted = await this.statementModel.findByIdAndDelete(statementId);

    if (!deleted) {
      throw new NotFoundException('Statement not found');
    }

    return {
      message: 'Statement deleted successfully',
    };
  }

  async updateStatement(
    statementId: string,
    userId: string,
    updateDto: Partial<CreateUserStatementDto>,
  ): Promise<UserStatement> {
    if (
      !Types.ObjectId.isValid(statementId) ||
      !Types.ObjectId.isValid(userId)
    ) {
      throw new BadRequestException('Invalid ID');
    }

    const statement = await this.statementModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(statementId),
        userId: new Types.ObjectId(userId),
      },
      updateDto,
      { new: true },
    );

    if (!statement) {
      throw new NotFoundException('Statement not found for this user');
    }

    return statement;
  }
}
