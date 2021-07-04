import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EpisodesModel } from './episodes.model';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
      expect(await episodesController.getEpisodes()).toStrictEqual([episode]);
    })
  })
  describe('Get episode', () => {
    it('should return episode', async () => {
      const episode = createdEpisodeMock();
      jest.spyOn(episodesModel, 'findOne').mockImplementation(async () => episode);
      expect(await episodesController.getEpisode({ episodeId: 1 })).toStrictEqual(episode);
    })
    it('should return 404 when episode not found', async (done) => {
      jest.spyOn(episodesModel, 'findOne').mockImplementation(async () => null);
      try {
        await episodesController.getEpisode({ episodeId: 1});
      } catch (err) {
        expect(err.status).toBe(404)
        expect(err.message).toBe('Episode not found.')
        done();
      }
    })
  })
  describe('Delete episode', () => {
    it('shoud delete episode', async () => {
      const episode = createdEpisodeMock();
      jest.spyOn(episodesModel, 'delete').mockImplementation(async () => episode);
      expect(await episodesController.deleteEpisode({ episodeId: 1 })).toStrictEqual(episode);
    })
    it('should return 404 when episode not found', async (done) => {
      jest.spyOn(episodesModel, 'findOne').mockImplementation(async () => null);
      try {
        await episodesController.deleteEpisode({ episodeId: 1});
      } catch (err) {
        expect(err.status).toBe(404)
        expect(err.message).toBe('Episode not found.')
        done();
      }
    })
  })
})
