"use strict";

require("dotenv/config");
var _logger = require("./logger");
var _apolloServer = require("apollo-server");
var _resolver = require("./resolver");
var _schema = require("./schema");
var _db = require("./db");
const server = new _apolloServer.ApolloServer({
  typeDefs: _schema.typeDefs,
  resolvers: _resolver.resolvers
});
server.listen().then(({
  url
}) => {
  _logger.logger.info(`🚀  Servidor listo en ${url}, inicializado en ${process.env.NODE_ENV} a las ${new Date().toISOString()}`);
});
const connection = async () => {
  try {
    await _db.sequelize.authenticate();
    _logger.logger.info('Conexion establecida!');
    console.log(_db.sequelize.models.Live);
    console.log(await _db.sequelize.models.Live.findAll());
    const live = await _db.sequelize.models.Live.create({
      id: "1",
      imagen: 'https://assets.bedu.org/images/Panel_26_ENE.png',
      titulo: 'Transformacion Digital: ¿En que etapa va tu empresa?',
      fecha: '2022-01-27'
    }, {
      field: [ID]
    });
    console.log(live);
  } catch (error) {
    _logger.logger.error('Error al conectarse a la DB', error);
  }
};

//connection()