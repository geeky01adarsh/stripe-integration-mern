const express = require("express");
const app = express();
const cors = require("cors")
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

app.get("/",(req, res)=>{
    return res.status(200).json({msg:"connected"})
})

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log(paymentIntent)
  res.status(200).json(paymentIntent.client_secret)
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));