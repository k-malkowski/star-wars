import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Character, Planet, Episode } from '@prisma/client';

@Injectable()
export class CharactersModel {
  constructor(private prisma: PrismaService) {}

  async add(characterData: Prisma.CharacterCreateInput): Promise<Character> {
    try {
      return await this.prisma.character.create({
        data: characterData
      })
    } catch (e) {
      throw e;
    }
  }

  async addPlanet(characterUuid: string, planetId: number): Promise<Character> {
    try {
      return await this.prisma.character.update({
        where: {
          uuid: characterUuid
        },
        data: {
          planet: {
            connect: {
              id: planetId
            }
          }
        }
      })
    } catch (e) {
      throw e;
    }
  }

  async addEpisode(characterUuid: string, episodeId: number): Promise<Character> {
    try {
      return await this.prisma.character.update({
        where: {
          uuid: characterUuid
        },
        data: {
          episodes: {
            connect: {
              id: episodeId
            }
          }
        }
      })
    } catch (e) {
      throw e;
    }
  }

  async update(characterFields: Prisma.CharacterUpdateInput, characterUuid: string): Promise<Character> {
    try {
      return await this.prisma.character.update({
        where: {
          uuid: characterUuid,
        },
        data: characterFields
      })
    } catch (e) {
      throw e;
    }
  }

  async delete(characterUuid: string): Promise<Character> {
    try {
      return await this.prisma.character.delete({
        where: {
          uuid: characterUuid
        }
      })
    } catch (e) {
      throw e;
    }
  }

  async findOne(characterFields: Prisma.CharacterWhereUniqueInput): Promise<Character> {
    try {
      return await this.prisma.character.findUnique({
        where: characterFields,
        include: {
          planet: true,
          episodes: true
        }
      })
    } catch (e) {
      throw e;
    }
  }

  async findMany(characterFields: Prisma.CharacterWhereInput, limit: number, from: number): Promise<any> {
    try {
      return await this.prisma.character.findMany({
        where: characterFields,
        include: {
          planet: true,
          episodes: true
        },
        skip: from,
        take: limit
      })
    } catch (e) {
      throw e;
    }
  }
}
