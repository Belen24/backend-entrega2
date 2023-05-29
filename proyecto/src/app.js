import express from "express";
import path from "path";
import {engine} from "express-handlebars";


import { __dirname } from "./utils.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { connectDB } from "./config/dbConnection.js";
import { cartsModel } from "./dao/models/carts.model.js";




const app = express();
const port = 8080;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));

app.listen(port,()=>console.log(`Server listening on port ${port}`));



//configuracion handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//conexion a la base de datos
connectDB();

//routes
app.use(viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);

