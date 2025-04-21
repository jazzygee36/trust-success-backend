import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  occupation: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zipCode: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  acctType: string;

  @IsNotEmpty()
  acctPin: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
