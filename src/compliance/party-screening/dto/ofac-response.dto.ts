import { ApiProperty } from '@nestjs/swagger';

export class OfacResponseDto {
  @ApiProperty({
    description: 'Indicates whether the person appears on OFAC lists',
    example: false,
  })
  isOfac!: boolean;
}
