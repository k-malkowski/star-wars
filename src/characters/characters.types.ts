import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCharacterDTO {
  @ApiProperty({
    default: 'Luke Skywalker'
  })
  @Length(1)
  @IsString()
  name!: string
}

export class UpdateCharacterDTO {
  @ApiProperty({
    default: 'Luke Skywalker'
  })
  @Length(1)
  @IsOptional()
  @IsString()
  name?: string
}

export class UpdateCharacterParamDTO {
  @ApiProperty({ default: '' })
  @IsUUID('4')
  characterUuid!: string;
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

export class GetCharactersDTO {
  @ApiProperty({ default: 5 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({ default: 0 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  from?: number;
}

export interface CharacterWithRelations {
  name: string;
  episodes: Array<string>;
  planet?: string;
}
