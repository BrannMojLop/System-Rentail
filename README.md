# Rentadito
¡No lo compres, réntalo!

Proyecto final para curso Bedu Santander Desarrollo Web Full-Stack con JavaScript

# Integrantes del Equipo #1:

- Brandon Mojica Lopez
- Rogelio Yael Vega Hernández
- Karina Lizeth Ortiz Muñoz
- Lourdes Araceli García Eulogio
- Juliet Guadalupe Quintero Rocha

# Proyecto: Rentadito

- [App del proyecto](https://system-rentail-app.herokuapp.com/)
- [API del proyecto](https://system-rentail-api.herokuapp.com/)

### Objetivo:

Con la finalidad de minimizar los impactos ambientales del consumo excesivo y contribuir a la integridad económica de la población, se ofrece una plataforma web para la renta de productos en la que los usuarios puedan publicar sus productos, así como solicitar en renta los de otros usuarios. Esta plataforma es compatible con computadoras y dispositivos móviles.

### Alcance:

En primer instancia, el proyecto está enfocado a un servicio básico que dé la oportunidad a los arrendadores de mostrar y publicar sus servicios o productos en renta mediante la Web, de la misma forma dar la oportunidad a los arrendatarios de llegar a estas publicaciones y solicitar informes para posteriormente concretar la renta del servicio y/o producto mediante un acuerdo estandarizado en tiempos y costos. Sin embargo, la forma en que se esta modularizando la API permite que el proyecto siga creciendo agregando más funcionalidades y controles según se requieran, por ejemplo:

- Control de Pagos
- Control de Envíos
- Estadísticas
- etc.

# Estructura de la API

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

# Fundamentos Técnicos de la API

### Tecnologías Aplicadas:

- JavaScript: Lenguaje de programación base de la aplicación.
- Babel: Transcopilador para el uso adecuado del código en cualquier navegador, incluyendo nuevas sintaxis del lenguaje.
- Express: Marco de trabajo base de la aplicación, adicionalmente se integran algunas librarías de express.
- MongoDB: Base de datos (NoSQL) base de la aplicación.
- React: Librería para la creación de la interfaz gráfica.
- MUI: Para el uso de componentes bien estructurados y personalizables.

# Tutorial para inciar el servidor de la API

### Pasos:

1.  Clonar repositorio en la rama main
2.  Instalar Node.js versión 8+
3.  Dentro de la raíz del proyecto correr el siguiente comando para instalar las dependencias necesarias del proyecto:

##### Comando: `npm install`

4.  Dentro de la raíz del proyecto correr el siguiente comando para generar la carpeta dist convirtiendo el código de ES6 en ES5:

##### Comando: `npm run build`

5.  Crea una Base de Datos en MongoDB Atlas, que te servira para probar la aplicacion

6.  Crear tu archivo .env configrando tus variables de entorno toma como ejemplo el archivo /.env.sample.

7.  Dentro de la raíz del proyecto correr el siguiente comando para arrancar el servidor:

##### Comando: `npm start`

8.  Ya puedes iniciar a crear peticiones, como lo indica la siguiente documentación: [Documentación API](https://system-rentail-api.herokuapp.com/api-docs/)
