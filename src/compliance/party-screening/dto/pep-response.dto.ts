import { ApiProperty } from '@nestjs/swagger';

export class PepResponseDto {
  @ApiProperty({
    description: 'Indicates whether the person is considered a PEP',
    example: false,
  })
  isPep!: boolean;
}
