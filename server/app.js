import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./src/models/index.js";
import userRouter from "./src/routes/user.routes.js";
import postRouter from "./src/routes/post.routes.js";
import rateRouter from "./src/routes/rate.routes.js";
import bookmarkRouter from "./src/routes/bookmark.routes.js";
import commentRouter from "./src/routes/comment.routes.js";
import apiRouter from "./src/routes/index.js";


dotenv.config();

try {
       // connectDB.sequelize.sync();
       connectDB.sequelize.sync({ force: false })
              .then(() => {
                     console.log('yes re-sync done!')
              })
} catch (error) {
       console.log(error);
}

const app = express();
const port = process.env.PORT || 3332;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
       extended: true
}));

// app.use('/', userRouter)
// app.use('/', postRouter)
// app.use('/', rateRouter)
// app.use('/', bookmarkRouter)
// app.use('/', commentRouter)

app.use('/', apiRouter)

app.get("/", (req, res) => {
       res.json({
              message: "Hell World"
       });
});


app.listen(port, () => {
       console.log(`Server is listening on http://localhost:${port}`);
});