import type { BulletModel } from '$/commonTypesWithClient/models';
import { UserIdParser, bulletIdParser, gameIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Bullet } from '@prisma/client';
import { z } from 'zod';

const toBullteModel = (prismaBullet: Bullet): BulletModel => ({
  id: bulletIdParser.parse(prismaBullet.id),
  createdPosition: z
    .object({
      x: z.number().min(0),
      y: z.number().min(0),
    })
    .parse(prismaBullet.createdPosition),
  direction: z.number().min(0).max(360).parse(prismaBullet.direction),
  type: z.number().min(0).parse(prismaBullet.type),
  playerId: prismaBullet.playerId === null ? undefined : UserIdParser.parse(prismaBullet.playerId),
  createdAt: prismaBullet.createdAt.getTime(),
  gameId: gameIdParser.parse(prismaBullet.gameId),
});

export const bulletsRepository = {
  findAll: async (): Promise<BulletModel[]> => {
    const prismaBullets = await prismaClient.bullet.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return prismaBullets.map(toBullteModel);
  },
  find: async (id: string): Promise<BulletModel | null> => {
    const prismaBullet = await prismaClient.bullet.findUnique({ where: { id } });
    return prismaBullet !== null ? toBullteModel(prismaBullet) : null;
  },
  delete: async (id: string): Promise<void> => {
    await prismaClient.bullet.delete({ where: { id } });
  },
};
