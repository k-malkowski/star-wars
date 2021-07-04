import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCharacterDTO {
  @ApiProperty({
    default: 'Luke Skywalker'
  })
  @Length(1)
  @IsString()
  name!: string
}

export class AddPlanetToCharacterDTO {
  @ApiProperty({ default: '' })
  @IsUUID('4')
  characterUuid!: string;

  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  planetId!: number;
}

export class AddEpisodeToCharacterDTO {
  @ApiProperty({ default: '' })
  @IsUUID('4')
  characterUuid!: string;

  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  episodeId!: number;
}

export class DeleteCharacterDTO {
  @ApiProperty({ default: '' })
  @IsUUID('4')
  characterUuid!: string;
}

export class GetCharacterDTO {
  @ApiProperty({ default: '' })
  @IsUUID('4')
  characterUuid!: string;
}
