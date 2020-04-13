const express = require('express');
const next = require('next');
const path = require('path');
const bodyParser = require('body-parser');
const keys = require("./server/config/keys");
const stripe = require('stripe')(keys.stripeSecretKey);
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dir: '.', dev });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
    const server = express();
    
    server.use('/images', express.static(path.join(__dirname, 'images'), {
        maxAge: dev ? '0' : '365d'
    }));

    server.use(bodyParser.json());

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.post('/api/stripe/checkout', async (req, res) => {
        await stripe.charges.create({
            amount: req.body.amount,
            currency: 'usd',
            description: 'Mojosa - React Next Landing Page Templates',
            source: req.body.token.id
        });
        res.send({})
    });

    const PORT = process.env.PORT || 3001;

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Read on http://localhost:${PORT}`)
    });
})