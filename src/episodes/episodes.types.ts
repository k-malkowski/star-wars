import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEpisodeDTO {
  @ApiProperty({
    default: 'Jedi'
  })
  @Length(1)
  @IsString()
  title!: string
}

export class UpdateEpisodeDTO {
  @ApiProperty({
    default: 'Brand new episode'
  })
  @Length(1)
  @IsOptional()
  @IsString()
  title?: string
}

export class UpdateEpisodeParamDTO {
  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  episodeId!: number;
}

export class GetEpisodeDTO {
  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  episodeId!: number;
}

export class DeleteEpisodeDTO {
  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  episodeId!: number;
}
