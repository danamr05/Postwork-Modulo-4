export const resolvers = { 
    Query: {
        getAllLives: () => lives,
        getLive: (_, { id }) => {
            return lives.find(e => e.id == id)
        },
    },
}

const live = [
    {id: 1, imagen: "https://assets.bedu.org/images/Panel_26_ENE.png", titulo: "Transformacion Digital: ¿En que etapa va tu empresa?", fecha: "2022-01-27"},
    {id: 2, imagen: "https://assets.bedu.org/images/Live_YT_12E.png", titulo: "The Matrix: ¿Seria posible con Inteligencia Artificial?", fecha: "2022-01-13"},
    {id: 3, imagen: "https://assets.bedu.org/images/Live_Youtube.png", titulo: "Capacita a tu personal y genera lealtad", fecha: "2022-01-02"},
    {id: 4, imagen: "https://assets.bedu.org/images/Panel_Adaptarse_youtube.png", titulo: "Adaptarse o quebrar: Los aprendizajes de 2021", fecha: "2022-12-02"},
    {id: 5, imagen: "https://assets.bedu.org/images/SI_ISO_Nov25_Evenbrite.png", titulo: "ISO 27032 en Ciberseguridad: ¿Por que debe tenerlo tu empresa?", fecha: "2021-11-26"},
    {id: 6, imagen: "https://assets.bedu.org/images/Live_youtube.png", titulo: "Negociacion en temas de conflictos", fecha: "2021-11-25"}
]
