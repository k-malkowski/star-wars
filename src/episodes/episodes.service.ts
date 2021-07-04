import { HttpException, Injectable } from '@nestjs/common';
import { EpisodesModel } from './episodes.model';
import { Episode } from '@prisma/client';
import { CreateEpisodeDTO } from './episodes.types';

@Injectable()
export class EpisodesService {
  constructor(private readonly episodesModel: EpisodesModel) {}

  async createEpisode(episodeData: CreateEpisodeDTO): Promise<Episode> {
    try {
      return await this.episodesModel.add(episodeData);
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  async getAllEpisodes(): Promise<Episode[] | []> {
    try {
      return await this.episodesModel.findMany({});
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }
}
