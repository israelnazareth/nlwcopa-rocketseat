import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { authenticate } from "../plugins/authenticate"
import { Prisma } from "@prisma/client"

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/:id/games/count', { onRequest: [authenticate] }, async (request) => {
    const count = await prisma.game.count()

    return { count }
  })

  fastify.get('/pools/:id/games', { onRequest: [authenticate] }, async (request) => {
    const getPoolParams = z.object({
      id: z.string(),
    })

    const { id } = getPoolParams.parse(request.params)

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'asc',
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId: request.user.sub,
              poolId: id,
            }
          }
        }
      }
    })

    return {
      games: games.map(game => {
        return {
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined,
        }
      })
    }
  })

  fastify.post('/pools/:id/games', { onRequest: [authenticate] }, async (request, reply) => {
    const createPoolBody = z.object({
      date: z.string(),
      firstTeamCountryCode: z.string(),
      secondTeamCountryCode: z.string(),
    })

    const { date, firstTeamCountryCode, secondTeamCountryCode } = createPoolBody.parse(request.body)

    await prisma.game.create({
      data: {
        date,
        firstTeamCountryCode,
        secondTeamCountryCode,
      }
    })

    return reply.status(201).send({ message: 'Created game!' })
  })

  fastify.put('/pools/:id/games/:id', { onRequest: [authenticate] }, async (request, reply) => {
    try {
      const idGameParams = z.object({ id: z.string() });
      const dateGameBody = z.object({
        date: z.string(),
        firstTeamCountryCode: z.string(),
        secondTeamCountryCode: z.string()
      })

      const { id } = idGameParams.parse(request.params)
      const { date, firstTeamCountryCode, secondTeamCountryCode } = dateGameBody.parse(request.body)
      
      await prisma.game.update({
        where: { id },
        data: {
          date,
          firstTeamCountryCode,
          secondTeamCountryCode
        }
      })

      return reply.status(200).send({ message: 'Game updated!' })

    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') throw { message: 'Game not found!' }
      }
    }
  })

  fastify.delete('/games/:id', { onRequest: [authenticate] }, async (request, reply) => {
    try {
      const idGameParams = z.object({ id: z.string() });

      const { id } = idGameParams.parse(request.params)
      
      const game = await prisma.game.delete({
        where: { id },
      })

      return reply.status(200).send({ message: 'Game deleted!' })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') throw { message: 'Game not found!' }
      }
      throw err
    }
  })
}
