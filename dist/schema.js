"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = void 0;
var _apolloServer = require("apollo-server");
const typeDefs = (0, _apolloServer.gql)`
  type Query {
    getAllLives: [Live],
    getLive(id:ID!): Live
  }
  type Mutation {
    insertLive(id:ID!,imagen:String, titulo:String, fecha:String): Live,
    updateLive(id:ID!,imagen:String, titulo:String, fecha:String): Live
  }
    type Live {
        id: ID, 
        imagen: String,
        titulo: String,
        fecha: String
    }

`;
exports.typeDefs = typeDefs;