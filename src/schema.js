import { gql } from 'apollo-server'

export const typeDefs = gql`

  type Query {
    getAllLives: [Live],
    getLive(id:ID!): Live
  }

  type Mutation {
    insertLive(
      id:ID!,
      imagen:String!,
      titulo:String,
      fecha:String!,
    ): Live,
    signIn(email:String!, password:String!): String

    updateLive(
      id:ID!,
      imagen:String,
      titulo:String,
      fecha:String,
    ): Live,

    signUp(input: UserInput): User
  }

  type Live {
    id:ID,
    imagen:String,
    titulo:String,
    fecha:String,
  }

  type User {
    id: Int
    name: String
    lastname: String
    email: String
    isAdmin: Boolean
  }

  input UserInput {
    name: String
    lastname: String
    email: String!
    password: String!
    isAdmin: Boolean
  }

`