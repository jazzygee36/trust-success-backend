import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';

import { User, UserSchema } from './schemas/user.schema';
import { UserStatement, UserStatementSchema } from './schemas/statement';

@Module({
  imports: [
    // PassportModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserStatement.name, schema: UserStatementSchema },
    ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || '4oei89504hgmndtiimmgbnshgj',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
