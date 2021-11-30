# project_backend_API

Proyecto final para curso Bedu Santander Desarrollo Web Full-Stack - BackEnd

# Integrantes del Equipo #5:

- Brandon Mojica Lopez
- Rogelio Yael Vega Hernández
- Christian Eduardo Suárez Ontiveros

# Proyecto: API para Sistema de Rentas

### Objetivo:

Ofrecer un servicio para la implementación de un sistema de rentas, la cual sea suficientemente robusta y escalable a la necesidad de las interfaces de usuario que el sistema requiera. El propósito de la API es brindar un control y una herramienta de una forma ordenada y estandarizada, para personas que requieran poner en renta sus servicios o productos y estos a su ves esten al alcance de otras personas que busquen un producto o servicio para interes personal, laboral, etc.

### Alcance:

En primer instancia la API esta enfocada a un servicio básico que de la oportunidad a los arrendadores de mostrar y publicar sus servicios o productos en renta mediante la Web, de la misma forma dar la oportunidad a los arrendadores de llegar a estas publicaciones y solicitar informes para posteriormente concretar la renta del servicio y/o producto mediante un acuerdo estandarizado en tiempos y costos. Sin embargo la forma en que sé esta modula rizando la API permite que el proyecto siga creciendo agregando más funcionalidades y controles según se requieran por ejemplo:

- Control de Pagos
- Control de Envíos
- Estadísticas
- etc.

# Estructura del Proyecto

### Entidades:

- Tipos de Usuario: Entidad que modela un tipo de usuario con el cual se controlan la acciones que cada usuario puede realizar.
- Usuarios: Entidad que modela a una persona la cual interactúe con la plataforma según el tipo de usuario que se le otorgó.
- Sectores: Entidad que modela un sector especifico de productos y/o servicios.
- Categorías: Entidad que modela categorías especificas de productos y/o servicios, las cuales se organizan mediante el sector.
- Productos: Entidad que modela un producto nuevo.
- Publicaciones de Renta: Entidad que modela una nueva publicación la cual sera mostrada a los arrendatarios.
- Solicitudes de Renta: Entidad que modela una solicitud de renta de un arrendatario a un arrendador.
- Rentas: Entidad que modela un renta nueva de un producto y/o servicio entre un arrendador y un arrendatario

### Usuarios:

- Administrador: Persona física que funge como encargado y/o administrador de la plataforma.
- Arrendador: Persona física que requiere de servicios y/o productos en renta.
- Arrendatario: Persona física que busca ofrecer servicios y/o productos en renta.

Para un mejor entendimiento de las entidades, usuarios y casos de uso pueden consultar el siguiente diagramas:

- [Diagrama_Entidades](https://drive.google.com/file/d/1uBLKCwS-GS7rOIiohY17Kgi7H9sFHRoK/view?usp=sharing)
- [Diagrama_Historias_de_Usuario](https://docs.google.com/document/d/1nPgRO4lJxKA0pWs1SntZzZmJlEOH1swSI4LR8IQuQTk/edit?usp=sharing)
- [Diagrama_Casos_de_Uso](https://drive.google.com/file/d/1OFqRugTuhmfUXwVrMvSI0av4IHohZGlB/view?usp=sharing)

# Fundamentos Técnicos

### Tecnologías Aplicadas:

- JavaScript: Lenguaje de programación base de la aplicación.
- Babel: Transcopilador para el uso adecuado del código en cualquier navegador, incluyendo nuevas sintaxis del lenguaje.
- Express: Marco de trabajo base de la aplicación, adicionalmente se integran algunas librarías de express.
- MongoDB: Base de datos (NoSQL) base de la aplicación.

# Instalación

### Pasos:

1.  Clonar repositorio en la rama main
2.  Instalar Node.js versión 8+
3.  Dentro de la raíz del proyecto correr el siguiente comando para instalar las dependencias necesarias del proyecto:

##### Comando: `npm install`

4.  Dentro de la raíz del proyecto correr el siguiente comando para generar la carpeta dist convirtiendo el código de ES6 en ES5:

##### Comando: `npm run build`

5.  Editar el archivo src/config/database.js, cambiado en URL de conexión el `<user>:<password>` con el usuario de la Base de Datos

##### URL a Editar: `mongodb+srv://<user>:<password>@bedu-backend.kfbjk.mongodb.net`

6.  Solicita al Administrador de base de datos agregar la dirección IP de tu dispositivo a la IP Access List de MongoDBAtlas
7.  Dentro de la raíz del proyecto correr el siguiente comando para arrancar el servidor:

##### Comando: `npm start`

8.  Ya puedes iniciar a crear peticiones, como lo indica la siguiente documentación: [Documentación API](https://income-system.herokuapp.com/api-docs/)
