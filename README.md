# Blends (API)

![alt text](https://i.ibb.co/YcgJCrq/Logo.png "Blends Logo")
- <b>Backend API</b>
- <b>Version:</b> ---
- <b>Status:</b> In Progress
- <b>Tech Stack:</b> NodeJS / ExpressJS / PostgreSQL
- <b>3rd Party :</b> ---
## API Endpoints
| Endpoint | Method | Request Body | Functionality |
|--|--| --| -- |
| <b>User</b>
| /users/ | POST | Object[User]  | Create a new user |
| /users | PUT | Object[User]  | Update specific user |
| /users | GET | {}  | Retrieve all users |
| /users/:user_id | GET | {}  | Retrieve specific user |
| /users | DELETE/:user_id | {}  | Delete specific user |
| <b>User Addresses</b>
| /users/:user_id/addresses | POST | Object[Address]  | Add new address for a user |
| /users/:user_id/addresses/:address_id | PUT | Object[Address]  | Update an address for a user |
| /users/:user_id/addresses | GET | {}  | Retrieve all saved addresses of a user |
| /users/:user_id/addresses/:user_id | GET | {}  | Retrieve a specific address of a user |
| /users/:user_id/addresses/ | DELETE | {}  | Delete all addresses of a user |
| /users/:user_id/addresses/:address_id | DELETE | {}  | Delete a specific address for a user |
| <b>Internal Categories</b>
| /internal-categories/ | POST | Object[InternalCategory]  | Create a new category |
| /internal-categories/:internal_category_id | PUT | Object[InternalCategory]  | Update a specific category 
| /internal-categories | GET | {}  | Retrieve all internal categories |
| /internal-categories/:internal_category_id | GET | {}  | Retrieve a specific category |
| /internal-categories/:internal_category_id | DELETE | {}  | Delete a specific category |
|<b>Product Categories</b>
| /product-categories | POST | Object[ProductCategory]  | Create a new category |
| /product-categories/:product_category_id | PUT | Object[ProductCategory]  | Update a specific category |
| /product-categories | GET | {}  | Retrieve all products categories |
| /product-categories/:product_category_id | GET | {}  | Retrieve a specific category |
| /product-categories/:product_category_id | DELETE | {}  | Delete a specific category |
|<b>Products (Admin)</b>
| /admin/products | POST | Object[Product]  | Create a new product |
| /admin/products/:product_id | PUT | Object[Product]  | Update a specific product |
| /admin/products | GET | {}  | Retrieve all products |
| /admin/products/:product_id | GET | {}  | Retrieve a specific product |
| /admin/products/:product_id | DELETE | {}  | Delete a specific product |
|<b>Products Custom Options (Admin)</b>
| /admin/products-custom-options | POST | Object[ProductCustomOption]  | Create a new product custom option |
| /admin/products-custom-options/:product_custom_option_id | PUT | Object[ProductCustomOption]  | Update a specific product custom option |
| /admin/products-custom-options | GET | {}  | Retrieve all products custom options |
| /admin/products-custom-options/:product_custom_option_id | DELETE | {}  | Delete a specific product custom option |
|<b>Products Tags (Admin)</b>
| /admin/products-tags | POST | Object[ProductTag]  | Create a new product tag |
| /admin/products-tags/:product_tag_id | PUT | Object[Product]  | Update a specific tag |
| /admin/products-tags | GET | {}  | Retrieve all tags |
| /admin/products-tags/:product_tag_id | DELETE | {}  | Delete a specific tag |

## Types
### User (Object)
- **first_name** (string) (**mandatory**) (only letters)
- **last_name** (string) (**mandatory**) (only letters)
- **phone_number**: (integer) (**mandatory**) (unique)
- **email** (string) (unique) (email validation)
- **email_verified** (boolean)
- **gender** (enum("male", "female", "other"))
- **dob** (date)
- **password_hash** (string) (**mandatory**)
- **password_salt** (string) (**mandatory**) (unique)
- **platform** (enum("ios", "android", "other"))
### Address (Object)
- **verified** (boolean) (default: **false**)
- **nickname** (string) (**mandatory**)
- **governate** (string) (**mandatory**)
- **details** (string) (**mandatory**)
- **street** (string)
- **building** (string) (**mandatory**)
- **floor** (string)
- **flat** (string)
- **coordinates** (string "lng,lat") (**mandatory**)
- **driver_notes** (string)
### InternalCategory (Object)
- **name** (string) (**mandatory**)
### ProductCategory (Object)
- **name** (string) (**mandatory**)
- **InternalCategoryId** (id) (**mandatory**)
### Product
- **order** (integer)
- **name** (string) (**mandatory**)
- **price** (double) (**mandatory**)
- **sale_price** (double) (default: 0)
- **description** (string)
- **SKU** (integer) (**mandatory**)
- **retail** (boolean)
- **brand** (string) (default: "Blends")
- **listed** (boolean) (**mandatory**)
- **quantity_per_box** (integer)
### ProductCustomOption
- **label** (string)
- **icon** (string)
- **mandatory** (boolean)
- **active** (boolean)
-- **ProductId** (id)
- **CustomOptions** (array[CustomOption])
### CustomOption
- **label** (string)
- **price** (double)
- **value** (string)
- **active** (boolean)
### Products Tags
- **label** (string)
- **color** (string ("#hexadec"))
- **product_id** (id)

