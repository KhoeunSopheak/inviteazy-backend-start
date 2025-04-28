"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const userService_1 = require("./services/userService");
const userController_1 = require("./controllers/userController");
const authController_1 = require("./controllers/authController");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const db_1 = require("./config/postgresdb/db");
const userRepository_1 = require("./repositories/postgres/userRepository");
const loggingMiddleware_1 = require("./middlewares/loggingMiddleware");
const db_2 = require("./config/mongodb/db");
const eventRoute_1 = __importDefault(require("./routes/eventRoute"));
const eventService_1 = require("./services/eventService");
const eventController_1 = require("./controllers/eventController");
const eventRepository_1 = require("./repositories/mongodb/eventRepository");
const inviteController_1 = require("./controllers/inviteController");
const inviteService_1 = require("./services/inviteService");
const inviteRepository_1 = require("./repositories/postgres/inviteRepository");
const inviteRoute_1 = __importDefault(require("./routes/inviteRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3003;
// Switch connection to database
(0, db_2.connectMongoDB)();
// connectMysqlDb();
const pgPool = (0, db_1.connectPostgresDb)();
// const mysqlPool = connectMysqlDb();
// Repositories
// const userRepository = new MongoUserRepository();
const userRepository = new userRepository_1.PostgresUserRepository(pgPool);
// const eventRepository = new PostgresEventRepository(pgPool);
const eventRepository = new eventRepository_1.MongoEventRepository();
const inviteRepository = new inviteRepository_1.PostgresInvitationRepository(pgPool);
// Services
const userService = new userService_1.UserService(userRepository);
const eventService = new eventService_1.EventService(eventRepository);
const inviteService = new inviteService_1.InviteService(inviteRepository);
// Controllers
const userController = new userController_1.UserController(userService);
const authController = new authController_1.AuthController(userService);
const eventController = new eventController_1.EventController(eventService);
const inviteController = new inviteController_1.InviteController(inviteService);
// Middlewares
app.use(express_1.default.json());
app.use(loggingMiddleware_1.loggingMiddleware);
// Routes
app.use("/api/users", (0, userRoutes_1.default)(userController));
app.use("/api/auth", (0, authRoutes_1.default)(authController));
app.use('/api/events', (0, eventRoute_1.default)(eventController));
app.use("/api/v1/invitation", (0, inviteRoute_1.default)(inviteController));
// Handle Errors
app.use(errorMiddleware_1.errorMiddleware);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
