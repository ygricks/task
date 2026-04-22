import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(500)
  @MinLength(3)
  name!: string;

  @IsString()
  @MaxLength(1000)
  @MinLength(3)
  description!: string;

  @IsNumber()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  status?: number;
}
