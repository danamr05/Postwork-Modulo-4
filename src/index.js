
import 'dotenv/config'
import { logger } from "./logger";
import { ApolloServer } from 'apollo-server'
import { resolvers } from './resolver'
import { typeDefs } from './schema'
import { sequelize } from './db'

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  logger.info(`🚀  Servidor listo en ${url}, inicializado en ${process.env.NODE_ENV} a las ${new Date().toISOString()}`)
})

const connection = async () => {
    try {
        await sequelize.authenticate()
        logger.info('Conexion establecida!')
        console.log(sequelize.models.Live);
        console.log(await sequelize.models.Live.findAll());
        const live = await sequelize.models.Live.create({
            id: "1",
            imagen: 'https://assets.bedu.org/images/Panel_26_ENE.png',
            titulo: 'Transformacion Digital: ¿En que etapa va tu empresa?',
            fecha: '2022-01-27',
        }, {field: [ID]});
        console.log(live);

    } catch (error) {
        logger.error('Error al conectarse a la DB', error)
    }
}

//connection()