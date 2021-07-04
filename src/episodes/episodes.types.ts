import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEpisodeDTO {
  @ApiProperty({
    default: 'Jedi'
  })
  @Length(1)
  @IsString()
  title!: string
}
