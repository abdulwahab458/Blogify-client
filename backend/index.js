
import express, { response } from "express"
import connectDb from "./lib/connectDB.js"
import userRouter from "./routes/users.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"
import webhookRouter from "./routes/webhook.route.js"
import { clerkMiddleware } from '@clerk/express'
import { requireAuth } from '@clerk/clerk-sdk-node';
import cors from "cors"

const app = express()
const port = 3000
app.use(cors(process.env.CLIENT_URL));
// app.use('/comments', requireAuth(), commentRouter);
app.use(clerkMiddleware())
app.use('/webhooks',webhookRouter)
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.get("/protect",(req,res)=>{
//   const {userId} = req.auth
//   if(!userId){
//     res.status(401).json("not authenticated")
//   }
//   console.log(userId)
//   res.json("done")
// })

// app.get('/', (req, res) => {
//   res.send('Hello World! hi abdul ')
// })
app.use('/users',userRouter);
app.use('/posts',postRouter);
app.use('/comments',commentRouter);

app.use((error,req,res,next)=>{
  res.status(error.status||500)
  res.json({
    message : error.message||"something went wrong",
    status : error.status,
    // stack : error.stack
  });
})


app.listen(port, () => {
  connectDb()
  console.log(`Example app listening on port fucking hell `)
})