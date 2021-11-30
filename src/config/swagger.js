const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: '3.0.0',
        components: {},
        info: {
            title: "Income-System",
            version: "1.0.0",
            description:
                "API de control y gestionamiento para el desarrollo de un Sistema de Renta de Productos",
            contact: {
                name: "Equipo 5, BEDU",
                url: "https://github.com/https://github.com/BrannMojLop/project_backend_API",
                email: "brandonmojica95@gmail.com"
            }
        },
        basePath: './src/documentation',
        servers: [
            {
                url: "http://localhost:4001",
                description: 'Servidor de Desarrollo'
            },
            {
                url: "https://system-rentail-api.herokuapp.com/",
                description: 'Servidor de Producciòn'
            }
        ],
    },
    apis: ["./src/documentation/*.yaml"]
};

const swaggerDoc = swaggerJsdoc(options);

export default swaggerDoc;