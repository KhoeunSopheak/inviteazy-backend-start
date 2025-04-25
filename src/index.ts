import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import authRoutes from "./routes/authRoutes";
import { connectPostgresDb } from "./config/postgresdb/db";
import { PostgresUserRepository } from "./repositories/postgres/userRepository";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { connectMongoDB } from "./config/mongodb/db";
import { MongoUserRepository } from "./repositories/mongodb/userRepository";

import { PostgresEventRepository } from "./repositories/postgres/eventRepository";
import eventRoutes from './routes/eventRoute';
import { EventService } from "./services/eventService";
import { EventController } from "./controllers/eventController";
import { MongoEventRepository } from "./repositories/mongodb/eventRepository";

import { connectMysqlDb } from "./config/mysqldb/db";
import { InviteController } from "./controllers/inviteController";
import { InviteService } from "./services/inviteService";
import { PostgresInvitationRepository } from "./repositories/postgres/inviteRepository";
import inviteRoute from "./routes/inviteRoute";

dotenv.config();

const app = express();
const port = 3003;

// Switch connection to database
// connectMongoDB();
const pgPool = connectPostgresDb();
// const mysqlPool = connectMysqlDb();

// Repositories
// const userRepository = new MongoUserRepository();
const userRepository = new PostgresUserRepository(pgPool);

// const eventRepository = new PostgresEventRepository(pgPool);
const eventRepository = new MongoEventRepository();
const inviteRepository = new PostgresInvitationRepository(pgPool);

// Services
const userService = new UserService(userRepository);
const eventService =  new EventService(eventRepository);
const inviteService = new InviteService(inviteRepository);


// Controllers
const userController = new UserController(userService);
const authController = new AuthController(userService);

const eventController = new EventController(eventService);

const inviteController = new InviteController(inviteService);


// Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/auth", authRoutes(authController));
app.use('/api/events', eventRoutes(eventController));
app.use("/api/v1/", inviteRoute(inviteController));



// Handle Errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
