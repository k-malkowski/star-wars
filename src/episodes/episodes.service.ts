import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { EpisodesModel } from './episodes.model';
import { Episode } from '@prisma/client';
import { CreateEpisodeDTO, UpdateEpisodeDTO } from './episodes.types';

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

  async getEpisodes(): Promise<Episode[] | []> {
    try {
      return await this.episodesModel.findMany({});
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  async episodeExists(episodeId: number): Promise<boolean> {
    try {
      return !!(await this.episodesModel.findOne({ id: episodeId }))
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  async getEpisode(episodeId: number): Promise<Episode> {
    try {
      if (!(await this.episodeExists(episodeId))) {
        throw new NotFoundException('Episode not found.');
      }
      return await this.episodesModel.findOne({ id: episodeId })
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  async deleteEpisode(episodeId: number): Promise<Episode> {
    try {
      if (!(await this.episodeExists(episodeId))) {
        throw new NotFoundException('Episode not found.');
      }
      return await this.episodesModel.delete(episodeId);
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  async updateEpisode(episodeData: UpdateEpisodeDTO, episodeId: number): Promise<Episode> {
    try {
      if (!(await this.episodeExists(episodeId))) {
        throw new NotFoundException('Episode not found.');
      }
      return await this.episodesModel.update(episodeData, episodeId);
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }
}
