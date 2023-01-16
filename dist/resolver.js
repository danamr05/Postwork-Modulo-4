"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;
var _apolloServerErrors = require("apollo-server-errors");
var _bcrypt = require("bcrypt");
var _jsonwebtoken = require("jsonwebtoken");
var _auth = require("./auth");
var _db = require("./db");
var _logger = require("./logger");
const SALT_ROUNDS = 10;
const resolvers = {
  Query: {
    getAllLives: async (_, __, {
      token
    }) => (0, _auth.verifyToken)(token) && (await _db.sequelize.models.Live.findAll()),
    getLive: async (_, {
      id
    }, {
      token
    }) => {
      (0, _auth.verifyToken)(token);
      return await _db.sequelize.models.Live.findOne({
        where: {
          id
        }
      });
    }
  },
  Mutation: {
    insertLive: async (_, {
      id,
      title,
      subtitle,
      date,
      time,
      mode,
      img
    }, {
      token
    }) => {
      return (0, _auth.verifyToken)(token) && (await _db.sequelize.models.Live.create({
        id,
        title,
        subtitle,
        date,
        time,
        mode,
        img
      }));
    },
    updateLive: async (_, {
      id,
      title,
      subtitle,
      date,
      time,
      mode,
      img
    }, {
      token
    }) => {
      (0, _auth.verifyToken)(token);
      const live = await _db.sequelize.models.Live.findOne({
        where: {
          id
        }
      });
      if (live) {
        await _db.sequelize.models.Live.update({
          title,
          subtitle,
          date,
          time,
          mode,
          img
        }, {
          where: {
            id
          }
        });
        return await _db.sequelize.models.Live.findOne({
          where: {
            id
          }
        });
      } else {
        throw new _apolloServerErrors.ApolloError('Live not found', 'ERR003');
      }
    },
    signUp: async (_, {
      input: user
    }) => {
      user.password = await (0, _bcrypt.hash)(user.password, SALT_ROUNDS);
      return await _db.sequelize.models.User.create({
        ...user
      });
    },
    signIn: async (_, {
      email,
      password
    }) => {
      const user = await _db.sequelize.models.User.findOne({
        where: {
          email
        }
      });
      if (user && (await (0, _bcrypt.compare)(password, user.password))) {
        const tokenData = {
          fullName: user.name + ' ' + user.lastname,
          email,
          isAdmin: user.isAdmin
        };
        _logger.logger.info(`[signIn] El usuario ${user.id} a accedido al sistema`);
        return (0, _jsonwebtoken.sign)(tokenData, process.env.JWT_SECRET, {
          expiresIn: 180
        });
      } else {
        _logger.logger.error(`[signIn] Credenciales inválidas para ${email}`);
        throw new _apolloServerErrors.AuthenticationError('Invalid credentials');
      }
    }
  }
};
exports.resolvers = resolvers;