import { IsInt, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanetDTO {
  @ApiProperty({
    default: 'Alderaan'
  })
  @Length(1)
  @IsString()
  name!: string
}

export class GetPlanetDTO {
  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  planetId!: number;
}

export class DeletePlanetDTO {
  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  planetId!: number;
}
