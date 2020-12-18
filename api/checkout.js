const env = require("./env.json");
const stripe = require('stripe')(env.STRIPE_PRIVATE_KEY);
const fetch = require("node-fetch");
const endpoint = env.NETLIFY ? env.DEPLOY_PRIME_URL : "https://5fdc54db1faa0100079c259c--hugoinaction.netlify.app/"; // "https://hugoinaction.github.io/GitHubPagesStore"

// http://localhost:3000/checkout?products=Circle,Red&products=Line,Blue&success=store/circle?success&cancel=store/circle?cancel


module.exports = {
  /**
   * Function to handle calls to the API endpoint of the cloud function.
   */
  async handler(event, context) {
    if (
      !event.queryStringParameters ||
      !event.queryStringParameters.products
    ) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "No products supplied.",
        }),
      };
    }

    let error = "Unknown error";

    try {

      const products = event.queryStringParameters.products.split(",");

      const data = await fetch(`${endpoint}/store/index.json`);


      if (data.ok) {
        const table = await data.json();
        const stripeData = {
          payment_method_types: ['card'],
          line_items: [
          ],
          mode: 'payment',
          success_url: `${endpoint}${event.queryStringParameters.success}`,
          cancel_url: `${endpoint}${event.queryStringParameters.cancel}`,
        };

        products.forEach(x => {
          const name = x.split("_")[0];
          const color = x.split("_")[1];
          stripeData.line_items.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${name}(${color})`,
                images: [table[name].cover],
              },
              unit_amount: parseFloat(table[name].price.trim().substr(1)) * 100,
            },
            quantity: 1,
          })
        });

        const session = await stripe.checkout.sessions.create(stripeData);
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: session.id,
            stripeData
          }),
        };
      } else {
        error = `Could not fetch pricing table due to ${data.statusCode}`;
      }
    } catch (e) {
      error = e.message;
    }

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error
      }),
    };


  },
};