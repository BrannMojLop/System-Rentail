import "@babel/polyfill";
require('./config/passport');
import server from "./config/server";

const main = async () => {
    await server.listen(server.get('port'));
    console.log(`Server on port: ${server.get('port')}`);
}

main();
