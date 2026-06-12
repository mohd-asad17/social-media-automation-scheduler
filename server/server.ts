import "dotenv/config"
import express, { type NextFunction, type Request, type Response} from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import socialAuthRouter from "./routes/socialAuthRoutes.js";
import accountRouter from "./routes/accountRoutes.js";
import postRouter from "./routes/postRoutes.js";
import activityRouter from "./routes/activityRoutes.js";
import { initScheduler } from "./services/schedulerService.js";

const app = express();

//Database connection
 await connectDB();

app.use(cors({
 origin: [
      "https://social-media-automation-scheduler.vercel.app"
    ],
    credentials: true,
}));
app.use(express.json());

const port = Number(process.env.PORT) || 3000;

app.get('/', (_req: Request, res: Response) => {
    res.send('Server is running!');
});
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running"
  });
});


app.use('/api/auth', authRouter);
app.use('/api/oauth', socialAuthRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/posts', postRouter);
app.use('/api/activity', activityRouter);



// initialize Scheduler
initScheduler();

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
console.error(err);
res.status(500).send(err?.response?.data?.message || err?.message)
})

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${port}`);
});
