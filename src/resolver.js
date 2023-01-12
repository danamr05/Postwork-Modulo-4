import { sequelize } from "./db"
import { logger } from "./logger"
import { ApolloError } from "apollo-server-errors"

export const resolvers = {
  Query: {
    getAllLives: async () => await sequelize.models.Live.findAll(),
    getLive: async (_, { id }) => {
      return await sequelize.models.Live.findOne({
        where: { id } // asin: asin
      })
    }
  },
  Mutation: {
    insertLive: async (_, { id, imagen, titulo, fecha }) => {
      return await sequelize.models.Live.create({
        id, imagen, titulo, fecha 
      })
    },
    updateLive: async (_, { id, imagen, titulo, fecha  }) => {
      // buscamos el libro con base al asin proporcionado
      let liveFound = await sequelize.models.Live.findOne({
        where: { id } // asin: asin
      })
      // Sino lo encontramos lanzamos un error
      if (!liveFound) {
          logger.error(`Live not found with asin: ${id}`)
          throw new ApolloError('Live not found', 'ERR003');
      }
      // En caso de encontrarlo actualizamos las propiedades que no vengan nulas
      imagen && (liveFound.imagen = imagen)
      titulo && (liveFound.titulo = titulo)
      fecha && (liveFound.fecha = fecha)
      // Actualizamos el libro
      liveFound.save()
      return liveFound;
  },
  }
}