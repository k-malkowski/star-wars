import { IsInt, IsString, Length } from 'class-validator';
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
