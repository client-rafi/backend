import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';


// importing the MogoDB
import connectDB from './config/db.js';
// importing the rest of the routes 
import ReferralRouter from './routes/referral.routes.js';
import BusinessRouter from "./routes/business.routes.js"
import ContactRouter from "./routes/contact.routes.js"
import PersonalRouter from "./routes/personal.routes.js";
import TradeRouter from "./routes/trade.routes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '250mb' }));

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
})


// Making the routes to the functions 
app.use("/api/v1/referrals",ReferralRouter)
app.use("/api/v1/business",BusinessRouter)
app.use("/api/v1/contacts",ContactRouter)
app.use("/api/v1/personal",PersonalRouter)
app.use("/api/v1/trades",TradeRouter);


const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(4000, () => console.log('Server started on port http://localhost:4000'));
  } catch (error) {
    console.log(error);
  }
}

startServer();