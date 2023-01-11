//const { logger } = require('./logger')

//logger.info('esta es una prueba con "info"')
//logger.error('esta es una prueba con "error"')
const express = require('express')
const { graphqlHTTP } = require ('express-graphql')
const { resolver } = require ('./resolver')
const { schema } = require ('./schema')
const { ApolloServer, gql } = require('apollo-server')

//sesion 3 
require('dotenv').config()
import { logger } from './logger'

logger.info('postwork')

//sesion 2
const app= express ()
app.use('/graphql', graphqlHTTP({
    schema : schema,
    rootValue: resolver,
    graphql: true,
}))
app.listen(4000)

//sesion 4
const typeDefs= gql`
#Definicion de schema
type Query {
    helloWorld: String
}
`
const resolvers = {
    Query: {
        helloWorld: () => 'Hola Mundo!'
    }
}
const server = ApolloServer ({typeDefs, resolvers})
server.listen().then(({ url }) => {
    console.log(`Servidor corriendo en ${url}`);
} )

console.log(process.env.MY_OWN_KEY)
