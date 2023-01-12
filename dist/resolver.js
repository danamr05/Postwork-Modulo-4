"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;
var _db = require("./db");
var _logger = require("./logger");
var _apolloServerErrors = require("apollo-server-errors");
const resolvers = {
  Query: {
    getAllLives: async () => await _db.sequelize.models.Live.findAll(),
    getLive: async (_, {
      id
    }) => {
      return await _db.sequelize.models.Live.findOne({
        where: {
          id
        } // asin: asin
      });
    }
  },

  Mutation: {
    insertLive: async (_, {
      id,
      imagen,
      titulo,
      fecha
    }) => {
      return await _db.sequelize.models.Live.create({
        id,
        imagen,
        titulo,
        fecha
      });
    },
    updateLive: async (_, {
      id,
      imagen,
      titulo,
      fecha
    }) => {
      // buscamos el libro con base al asin proporcionado
      let liveFound = await _db.sequelize.models.Live.findOne({
        where: {
          id
        } // asin: asin
      });
      // Sino lo encontramos lanzamos un error
      if (!liveFound) {
        _logger.logger.error(`Live not found with asin: ${id}`);
        throw new _apolloServerErrors.ApolloError('Live not found', 'ERR003');
      }
      // En caso de encontrarlo actualizamos las propiedades que no vengan nulas
      imagen && (liveFound.imagen = imagen);
      titulo && (liveFound.titulo = titulo);
      fecha && (liveFound.fecha = fecha);
      // Actualizamos el libro
      liveFound.save();
      return liveFound;
    }
  }
};
exports.resolvers = resolvers;