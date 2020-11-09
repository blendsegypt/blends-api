import Express from "express"; // Express
import Path from "path"; // Path to enable path methods
import CookieParser from "cookie-parser"; // Cookie Parser to parse cookies from HTTP requests
import Logger from "morgan"; // Morgan Logger for debugging
import cors from "cors"; //Allow cross-origin requests
import expiredShipmentsCronJob from "./cron/expiredShipments";

// import routes
import appRoutes from "./routes/app";
import adminRoutes from "./routes/admin";

//Initialize Express Application
var App = Express();

// Apply Middleware
App.use(Logger("dev"));
App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));
App.use(CookieParser());
App.use(Express.static(Path.join(__dirname, "public")));
App.use(cors());

// use routes
App.use("/app", appRoutes);
App.use("/admin", adminRoutes);

export default App;
