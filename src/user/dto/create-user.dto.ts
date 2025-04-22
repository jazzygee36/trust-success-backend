import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsDateString,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  gender!: string;

  @IsNotEmpty()
  // @IsDateString() 
  dob!: string;

  @IsNotEmpty()
  @IsString()
  occupation!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  country!: string;

  @IsNotEmpty()
  @IsString()
  state!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()

zipCode!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  acctType!: string;

  @IsNotEmpty()
  @IsString()
  acctPin!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;


}
