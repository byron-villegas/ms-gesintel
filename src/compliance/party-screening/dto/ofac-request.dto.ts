import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for OFAC screening request. Validates the input data for OFAC checks.
 */
export class OfacRequestDto {
  @ApiProperty({
    description: 'Person Chilean RUT',
    example: '11111111-1',
    minLength: 7,
    maxLength: 10,
    pattern: '^[0-9kK-]+$',
  })
  @IsString()
  @IsNotEmpty()
  @Length(7, 10)
  @Matches(/^[0-9kK-]+$/, {
    message: 'rut must contain only digits, k, or hyphen',
  })
  rut!: string;

  @ApiProperty({
    description: 'Person given names',
    example: 'Juan Carlos',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  names!: string;

  @ApiProperty({
    description: 'First last name',
    example: 'Bodoque',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  firstLastName!: string;

  @ApiProperty({
    description: 'Second last name',
    example: 'Triviño',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @Length(0, 50)
  secondLastName!: string;

  @ApiProperty({
    description: 'Birth date in yyyy-MM-dd format',
    example: '1996-06-22',
    pattern: '^\\d{4}-\\d{2}-\\d{2}$',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'birthDate must be in the format yyyy-MM-dd',
  })
  birthDate!: string;
}
