import Express from "express"; // Express
import Path from "path"; // Path to enable path methods
import CookieParser from "cookie-parser"; // Cookie Parser to parse cookies from HTTP requests
import Logger from "morgan"; // Morgan Logger for debugging
//Controller import example:
import UserController from "./controllers/users";
import InternalCategoriesController from "./controllers/internalCategories";
import ProductCategoriesController from "./controllers/productCategories";
import ProductsAsAdmin from "./controllers/productsAsAdmin";
import ProductCustomOptions from "./controllers/productCustomOptions";
import ProductTags from "./controllers/productTags";
import ProductAsUser from "./controllers/productAsUser";

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
App.use("/users", UserController);
App.use("/internal-categories", InternalCategoriesController);
App.use("/product-categories", ProductCategoriesController);
App.use("/admin/products", ProductsAsAdmin);
App.use("/admin/products-custom-options", ProductCustomOptions);
App.use("/admin/products-tags", ProductTags);
App.use("/products", ProductAsUser);

export default App;
