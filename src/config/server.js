import express from "express";
const swaggerUi = require("swagger-ui-express");
require('dotenv').config();

const server = express();

// Routes
import IndexRoute from "../routes/index.routes";
import SectorsRoutes from "../routes/sectors.routes";
import CategoriesRoutes from "../routes/categories.routes";
import ProductsRoutes from "../routes/products.routes";
import UsersRoutes from "../routes/users.routes";
import TypesUsersRoutes from "../routes/typesUsers.routes";
import PeriodsRoutes from "../routes/periods.routes";
import PublicationsRoutes from "../routes/publications.routes";
import Rental_RequestsRoutes from "../routes/rentails_requests.routes";
import Rents from "../routes/rents.routes";
import SwaggerDocs from "../config/swagger";

// Settings
server.set("port", process.env.PORT || 4001);

// Middleware
server.use(express.json());
// Configurar cabeceras y cors
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes
server.use(IndexRoute);
server.use("/sectors", SectorsRoutes);
server.use("/categories", CategoriesRoutes);
server.use("/products", ProductsRoutes);
server.use("/users", UsersRoutes);
server.use("/types-users", TypesUsersRoutes);
server.use("/periods", PeriodsRoutes);
server.use("/publications", PublicationsRoutes);
server.use("/rental-requests", Rental_RequestsRoutes);
server.use("/rents", Rents);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerDocs));

export default server;
