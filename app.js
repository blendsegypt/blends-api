import Express from "express"; // Express
import Path from "path"; // Path to enable path methods
import CookieParser from "cookie-parser"; // Cookie Parser to parse cookies from HTTP requests
import Logger from "morgan"; // Morgan Logger for debugging
//Controller import example:
//import UserController from "./controllers/user";

//Initialize Express Application
var App = Express();

// Apply Middleware
App.use(Logger("dev"));
App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));
App.use(CookieParser());
App.use(Express.static(Path.join(__dirname, "public")));

/*
 *
 *  API Routes
 *
 */

//Controller usage example:
//App.use("/users", UserController);

export default App;
