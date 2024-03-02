import { initServer } from "./configs/app.js";
import { connect } from "./configs/mongo.js";
import { agregarCursoDeterminado } from "./src/Curso/curso.controller.js";
import { agregarMaestroDeterminado } from "./src/User/user.controller.js";


initServer()
connect()
agregarMaestroDeterminado()
agregarCursoDeterminado()