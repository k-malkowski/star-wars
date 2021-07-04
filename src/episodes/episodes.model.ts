import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Episode } from '@prisma/client';

@Injectable()
export class EpisodesModel {
  constructor(private prisma: PrismaService) {}

  async add(episodeData: Prisma.EpisodeCreateInput): Promise<Episode> {
    try {
      return await this.prisma.episode.create({
        data: episodeData
      })
    } catch (e) {
      throw e;
    }
  }

  async update(episodeFields: Prisma.EpisodeUpdateInput, episodeId: number): Promise<Episode> {
    try {
      return await this.prisma.episode.update({
        where: {
          id: episodeId,
        },
        data: episodeFields
      })
    } catch (e) {
      throw e;
    }
  }

  async delete(episodeId: number): Promise<Episode> {
    try {
      return await this.prisma.episode.delete({
        where: {
          id: episodeId
        }
      })
    } catch (e) {
      throw e;
    }
  }

  async findOne(episodeFields: Prisma.EpisodeWhereUniqueInput): Promise<Episode> {
    try {
      return await this.prisma.episode.findUnique({
        where: episodeFields
      })
    } catch (e) {
      throw e;
    }
  }

  async findMany(episodeFields: Prisma.EpisodeWhereInput): Promise<Episode[]> {
    try {
      return await this.prisma.episode.findMany({
        where: episodeFields
      })
    } catch (e) {
      throw e;
    }
  }
}
