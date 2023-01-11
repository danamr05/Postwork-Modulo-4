import { gql } from 'apollo-server'
export const typeDefs = gql`

type Query{
        saludo: String,
        getLive(id:ID!): Live,
        getAllLives: [Live],
    },
    type Live {
        id: ID, 
        imagen: String,
        titulo: String,
        fecha: String
    }

`

