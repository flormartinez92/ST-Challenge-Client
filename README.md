<a name="home"></a>

<div align="center">
  <p align="center">
    <h3 align="center">E-Commerce WINE</h3>
    <a href="#"><strong>See the website »</strong></a>
    <br />
    <a href="https://github.com/flormartinez92/st-challenge-client"><strong>See the frontend repository »</strong></a>
    <br />
    <a href="https://github.com/flormartinez92/sd-challenge-api"><strong>See the backend repository »</strong></a>
    <br />
  </p>
</div>

## Table of contents

<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
    <ul>
      <li><a href="#built-with">Built With</a></li>
      <li><a href="#backend-overview">Backend Overview</a></li>
      <li><a href="#backend-extras">Backend Extras</a></li>
      <li><a href="#frontend-overview">Frontend Overview</a></li>
      <li><a href="#frontend-extras">Frontend Extras</a></li>
    </ul>
  </li>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#backend-setup">Backend Setup</a></li>
      <li><a href="#frontend-setup">Frontend Setup</a></li>
      <li><a href="#accesing-the-application">Accessing the application</a></li>
    </ul>
  </li>
  <li>
    <a href="#functionalities">Functionalities</a>
    <ul>
      <li><a href="#user-access">User Access</a></li>
    </ul>
  </li>
  <li><a href="#contact">Contact</a></li>
</ol>

## About The Project

This project is a full-stack e-commerce application built with Node.js for the backend and Next.js for the frontend. It allows users, depending on their role (admin or regular user), to perform CRUD operations on products. Admin users have access to all CRUD functionalities, while regular users have restricted access. The application enables users to create, read, update, and delete products. Additionally, the frontend displays a list of products fetched from the backend and provides a detailed view for each product. The application uses PostgreSQL as the database for storing product information.

### Built With

|          |        |            |
| :------: | :----: | :--------: |
|  NextJS  | Redux  | PostgreSQL |
| Tailwind | NodeJS | Sequelize  |

<p align="right"><a href="#home">⬆ Back to top</a></p>

### Backend Overview

#### Framework: Node.js

#### API: RESTful

#### Products Endpoints:

- **/products**: Endpoint for CRUD operations on products.
  - **GET /**: Retrieves a list of all products.
  - **GET /:id**: Retrieves a specific product by its ID.
  - **POST /product**: Creates a new product.
  - **PUT /:id**: Updates an existing product.
  - **DELETE /:id**: Deletes a product by its ID.

#### Brands Endpoints:

- **/brands**: Endpoint for CRUD operations on brands.
  - **GET /**: Retrieves a list of all brands.
  - **GET /:id**: Retrieves a specific brand by its ID.
  - **POST /brand**: Creates a new brand.
  - **PUT /:id**: Updates an existing brand.
  - **DELETE /:id**: Deletes a brand by its ID.

#### Users Endpoints:

- **/users**: Endpoint for CRUD operations on users.
  - **POST /register**: Registers a new user.
  - **POST /login**: Logs in an existing user.
  - **GET /profile**: Retrieves the profile of the authenticated user.
  - **POST /logout**: Logs out the authenticated user.

<p align="right"><a href="#home">⬆ Back to top</a></p>

### Backend Extras

- **Authentication**: Implemented token-based authentication to protect the create, update, and delete operations. Only authenticated requests are allowed to perform these operations. Authentication is based on the `isAdmin` property of the user object, which determines whether a user has administrative privileges (`isAdmin: true`) or not (`isAdmin: false`).

- **Additional Model**: Added a second model for brands. Each product is associated with a brand, which has a name and logo URL.

<p align="right"><a href="#home">⬆ Back to top</a></p>

### Frontend Overview

#### Framework: NextJS

#### Technologies: Utilized `redux-toolkit`, `redux`, `axios`, `framer-motion`, `react` and `tailwind` for UI development.

#### Features:

- Displays a list of products fetched from the backend.
- Provides pagination for navigating through the product list.
- Allow users to view detailed information about each product, including description.

<p align="right"><a href="#home">⬆ Back to top</a></p>

### Frontend Extras

- **Admin Panel**: Implemented an admin panel where authenticated users can perform CRUD operations directly from the frontend.
- **Authentication**: Optionally, administrators can log in with a password to access the admin panel.

<p align="right"><a href="#home">⬆ Back to top</a></p>

## Getting Started

To get a local copy of this project up and running, follow these steps:

### Backend Setup

1. Clone the backend repository in your local:

   ```sh
   git clone https://github.com/flormartinez92/sd-challenge-api
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Create a PostgreSQL database for the application. You can use the following SQL command as a template:

   ```sh
   CREATE DATABASE <database-name>;
   ```

   Replace `<database-name>` with the name you want to give to your database.

4. Configure the environment variables by creating a .env file in the root of the backend directory. Here's an example .env file with placeholders for the database connection details:

   ```plaintext
   PORT=some_port
   DB_HOST="some_db_host"
   ACCESS_TOKEN_SECRET="some_access_token_secret"
   ECOMMERCE_WINE_CLIENT_HOST="some_ecommerce_wine_client_host"
   ADMIN_USER="some_admin_user"
   ADMIN_USER_PASSWORD="some_admin_password"
   ```

5. Start the backend server:

   ```sh
   npm run server
   ```

   The backend server should now be running on your local.

<p align="right"><a href="#home">⬆ Back to top</a></p>

### Frontend Setup

1. Clone the frontend repository in your local:

   ```sh
   git clone https://github.com/flormartinez92/st-challenge-client
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Configure the environment variables by creating a .env file in the root of the frontend directory. Here's an example .env file with placeholders for the API connection details:

   ```plaintext
   NEXT_PUBLIC_API_URL=somehost
   ```

4. Start the frontend development server:

   ```sh
   npm run dev
   ```

   The frontend development server should now be running on your local.

<p align="right"><a href="#home">⬆ Back to top</a></p>

### Accessing Application

Once both the backend and frontend servers are running, you can access the application by opening your web browser and navigating to the appropriate URL. By default, the backend server runs on port 8080 and the frontend development server runs on port 3000. You can adjust the ports as needed in the respective configuration files.

<p align="right"><a href="#home">⬆ Back to top</a></p>

## Functionalities

### User Access

- **Regular Users**: Regular users have access to the basic functionalities of the application, including viewing the list of products. They can browse through the products and access detailed information about each product.

- **Administrators**: Administrators have additional privileges compared to regular users. In addition to viewing the list of products, administrators can access the admin panel as detailed in the Frontend Extras section above.

For access to the administrator panel, please contact me at martinez.mf.92@gmail.com. I'll provide you with the necessary credentials to explore the admin functionalities. Enjoy exploring the application!

<p align="right"><a href="#home">⬆ Back to top</a></p>

## Contact

<p>Maria Florencia Martinez:</p>
  <a href="mailto:martinez.mf.92@gmail.com" target="_blank" rel="noopener noreferrer">
    <img alt="Gmail" title="gmail" src="https://custom-icon-badges.demolab.com/badge/-martinez.mf.92@gmail.com-red?style=for-the-badge&logo=mention&logoColor=white"/></a>
  <a href="https://www.linkedin.com/in/florencia-martinez92/" target="_blank" rel="noopener noreferrer">
    <img alt="Linkedin" title="linkedin" src="https://custom-icon-badges.demolab.com/badge/-Linkedin-blue?style=for-the-badge&logoColor=white&logo=linkedin"/></a>
  <a href="https://github.com/flormartinez92" target="_blank" rel="noopener noreferrer">
    <img alt="Github" title="Github" src="https://custom-icon-badges.demolab.com/badge/-Github-grey?style=for-the-badge&logoColor=white&logo=github"/></a>

<p align="right"><a href="#home">⬆ Back to top</a></p>
