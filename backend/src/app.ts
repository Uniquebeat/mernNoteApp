import "dotenv/config"; //config .env
import express, { NextFunction, Request, Response } from "express";
import noteRouters from "./routes/note";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev")); // for log in terminal

app.use(express.json()); // act as json server

app.use("/api/notes", noteRouters)// add router

// invalid url 404
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Endpoint not found! Try /api/notes/"));
});

// response error as json
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "An unknow error occured"; // default error message
    let statusCode = 500; // default error code
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;