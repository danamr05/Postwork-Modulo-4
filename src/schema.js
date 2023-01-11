const { buildSchema } = require('graphql')

const schema = buildSchema(`
    type Query{
        saludo: String,
        getLive(id:ID!): Live,
        getAllLives: [Live],
    },
    type Live {
        id: ID, 
        imagen: String,
        titulo: String,
        fecha: String,
    }
`)

module.exports = { schema }