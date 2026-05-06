import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PepRequestDto {
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
}
