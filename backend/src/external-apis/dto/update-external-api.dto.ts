import { PartialType } from '@nestjs/mapped-types';
import { CreateExternalApiDto } from './create-external-api.dto';

export class UpdateExternalApiDto extends PartialType(CreateExternalApiDto) {}
