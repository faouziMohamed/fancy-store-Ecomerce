const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51M1E3zIogPD1WRLZQCzLyWKaHKboXKYFGylLWkpsOytpnqPBJmnEXLu2equ9NVnn4CT2Lin9TQ67ilc4LZvlqJjy00Q4z9I23P"
);
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const YOUR_DOMAIN = "http://localhost:4242";

function extractItem(item) {
  return {
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [item.product],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  };
}

app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
    ],
    line_items: req.body.items.map(extractItem),
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.status(200).json(session);
});

app.listen(4242, () => console.log("Running http://localhost:4242"));
