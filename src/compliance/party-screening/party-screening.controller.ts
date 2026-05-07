import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OfacRequestDto } from './dto/ofac-request.dto';
import { OfacResponseDto } from './dto/ofac-response.dto';
import { PepRequestDto } from './dto/pep-request.dto';
import { PepResponseDto } from './dto/pep-response.dto';
import { PartyScreeningService } from './party-screening.service';

const VALIDATION_BAD_REQUEST_SCHEMA = {
  type: 'object',
  properties: {
    message: {
      type: 'array',
      items: { type: 'string' },
      example: [
        'rut must contain only digits, k, or hyphen',
        'birthDate must be in the format yyyy-MM-dd',
      ],
    },
    error: { type: 'string', example: 'Bad Request' },
    statusCode: { type: 'number', example: 400 },
  },
};

@ApiTags('Party Screening')
@Controller('api/party-screening')
export class PartyScreeningController {
  constructor(private readonly partyScreeningService: PartyScreeningService) {}

  @Post('ofac')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Checks whether a person matches OFAC lists' })
  @ApiBody({
    type: OfacRequestDto,
    description: 'Person identification data to evaluate against OFAC',
  })
  @ApiOkResponse({
    description: 'OFAC screening result',
    type: OfacResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload based on validation rules',
    schema: VALIDATION_BAD_REQUEST_SCHEMA,
  })
  checkOfac(@Body() ofacRequestDto: OfacRequestDto): OfacResponseDto {
    return this.partyScreeningService.checkOfac(ofacRequestDto);
  }

  @Post('pep')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Checks whether a person is a PEP' })
  @ApiBody({
    type: PepRequestDto,
    description: 'Person identifier for PEP evaluation',
  })
  @ApiOkResponse({
    description: 'PEP screening result',
    type: PepResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload based on validation rules',
    schema: VALIDATION_BAD_REQUEST_SCHEMA,
  })
  checkPep(@Body() pepRequestDto: PepRequestDto): PepResponseDto {
    return this.partyScreeningService.checkPep(pepRequestDto);
  }
}
