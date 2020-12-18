import Express from "express"; // Express
import Path from "path"; // Path to enable path methods
import CookieParser from "cookie-parser"; // Cookie Parser to parse cookies from HTTP requests
// ES6 modules causes deprecated warning from Morgan, so here we use CommonJS imports instead
const Logger = require("morgan"); // Morgan Logger for debugging
import cors from "cors"; //Allow cross-origin requests

// cron jobs
import expiredShipmentsCronJob from "./cron/expiredShipments";

// import routes
// application (v1) routes
import appRoutesV1 from "./routes/app.v1";
import adminRoutes from "./routes/admin";

//Initialize Express Application
var App = Express();

// Apply Middleware
if (process.env.NODE_ENV === "development") {
  App.use(Logger("dev"));
}
App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));
App.use(CookieParser());
App.use(Express.static(Path.join(__dirname, "public")));
App.use(cors());

// use routes
App.use("/app/v1", appRoutesV1);
App.use("/admin", adminRoutes);

// Error handling
App.use((req, res) => {
  res.status(403).send("Unauthorized");
});

export default App;
