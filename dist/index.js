"use strict";

require("dotenv/config");
var _logger = require("./logger");
var _apolloServer = require("apollo-server");
var _resolver = require("./resolver");
var _schema = require("./schema");
const server = new _apolloServer.ApolloServer({
  typeDefs: _schema.typeDefs,
  resolvers: _resolver.resolvers,
  context: async ({
    req
  }) => {
    return {
      token: req.headers.authorization || ''
    };
  }
});
server.listen().then(({
  url
}) => {
  _logger.logger.info(`🚀  Servidor listo en ${url}, inicializado en ${process.env.NODE_ENV} a las ${new Date().toISOString()}`);
});