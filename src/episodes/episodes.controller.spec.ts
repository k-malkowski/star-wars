import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EpisodesModel } from './episodes.model';
import { BadRequestException } from '@nestjs/common';

const dateMock = new Date('01.01.2020');

const createEpisodeMock = (title = 'Jedi') => {
  return {
    title
  }
}

const createdEpisodeMock = (id = 1, title = 'Jedi', createdAt = dateMock, updatedAt = dateMock) => {
  return {
    id,
    title,
    createdAt,
    updatedAt
  }
}

describe('EpisodesController', () => {
  let prismaService: PrismaService;
  let episodesModel: EpisodesModel;
  let episodesService: EpisodesService;
  let episodesController: EpisodesController;

  beforeEach(() => {
    prismaService = new PrismaService();
    episodesModel = new EpisodesModel(prismaService);
    episodesService = new EpisodesService(episodesModel);
    episodesController = new EpisodesController(episodesService);
  })
  describe('Create episode', () => {
    it('should create and return episode', async () => {
      const episode = createdEpisodeMock();
      jest.spyOn(episodesModel, 'add').mockImplementation(async () => episode)
      expect(await episodesController.createEpisode(createEpisodeMock())).toStrictEqual(episode);
    })
  })
  describe('Get episodes', () => {
    it('should return all episodes', async () => {
      const episode = createdEpisodeMock();
      jest.spyOn(episodesModel, 'findMany').mockImplementation(async () => [episode])
      expect(await episodesController.getAllEpisodes()).toStrictEqual([episode]);
    })
  })
})
