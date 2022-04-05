# Project: Around the U.S. Social Network
## About the Project
**Around the U.S.** is a full stack project that features a responsive social network website where a user can have a collection of the pictures of his journey around the US. The webpage interacts with the API endpoints using REST API calls hosted on a backend server.

## Features of the App
1. A new user can register.
2. A registered user can login and logout.
3. When the page loads, all the existing image cards load from the server.
4. When the page loads, the current user's name and about info are loaded from the server.
5. User can edit and save his profile details to the server.
6. User can update his avatar by uploading a new image to the server.
7. User can like or unlike the images. The status is stored on the server.
8. User can view the number of likes on an image card.
9. User can add a new card with the title and the link for the image. The new card is stored on the server.
10. User can delete the image cards that he has added, if he wishes to. The card would be deleted from the server too.
11. User can also have a closer look of the images by clicking on them.
12. Live input validation on all the forms.
13. Users can close the popup by clicking on the overlay, i.e. anywhere outside the popup's borders.
14. Users can close the popup by pressing the Esc key.

## Technologies and Standards Used for Frontend
1. HTML (Hyper Text Markup Language)
2. CSS (Cascading Style Sheets)
3. React.js

**There are various tools that have been used throughout the project design and development:**
| Tools                                             | Usage                                             |
|---------------------------------------------------|---------------------------------------------------|
| Figma                                             | For referring to the product design specification |
| [TinyPng](https://tinypng.com/)                   | For JPEG/PNG Image Compression                    |
| [SVGOMG](https://jakearchibald.github.io/svgomg/) | For refining and compressing SVGs                 |
| [Webpack](https://webpack.js.org/)                | For bundling all the ES modules                   |
| [Babel](https://babeljs.io/)                      | For transpiling JS code                           |

**The main concepts that have been emphasized are:**
1. Responsive Web Design
2. CSS Grid
3. CSS Flexbox
4. BEM Specification
5. Git Conventional Commits Specification

## Technologies and Standards Used for Backend
The backend API has been developed in Node.js using Express Framework.

**The main packages that have used throughout the backend API development and deployment:**
| Packages        | Usage                                                                     |
|-----------------|---------------------------------------------------------------------------|
| bcryptjs        | For encrypting password                                                   |
| celebrate       | An express middleware function that wraps the `joi` validation library    |
| express-winston | Provides middlewares for request and error logging of express application |
| jsonwebtoken    | Helps in generating, comparing and verifying the JWTs                     |
| validator       | Validates and sanitizes strings                                           |
| winston         | Universal logging library                                                 |
| pm2             | Production process manager with a built-in load balancer                  |

Apart from the above listed packages, we have used **MongoDB** as our database, **NGINX** as a reverse proxy server and [Let's Encrypt](https://letsencrypt.org/) to get SSL certificates to create an encrypted connection and establish trust.

## REST API Endpoints
| HTTP Methods | REST API Endpoint      | Purpose                                |
|--------------|------------------------|----------------------------------------|
| `POST`       | `/signup`              | Registers a user                       |
| `POST`       | `/signin`              | Login a user                           |
| `GET`        | `/users`               | Get JSON list of all the users         |
| `GET`        | `/users/:userId`       | Get a specific user profile with an ID |
| `POST`       | `/users`               | Create a specific user profile         |
| `PATCH`      | `/users/me`            | Update the current user profile        |
| `PATCH`      | `/users/me/avatar`     | Update the current user avatar         |
| `GET`        | `/cards`               | Get JSON list of all the cards         |
| `POST`       | `/cards`               | Create a new card                      |
| `DELETE`     | `/cards/:cardId`       | Delete a card by the given ID          |
| `PUT`        | `/cards/:cardId/likes` | Update a card by liking it             |
| `DELETE`     | `/cards/:cardId/likes` | Delete a like on the card              |

## Live Demo
Visit the complete React application - [here](https://shraddha.students.nomoreparties.sbs)  
Visit the complete Backend API - [here](https://api.shraddha.students.nomoreparties.sbs)
