import { PartialType } from '@nestjs/mapped-types';
import { CreateUserStatementDto } from './create-user-statement.dto';

export class UpdateUserStatementDto extends PartialType(
  CreateUserStatementDto,
) {}
