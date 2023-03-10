import { gql } from 'apollo-server'

export const typeDefs = gql`
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

`

