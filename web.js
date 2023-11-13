import express from 'express';
import { getProducts, getProduct, createProduct, addToCart, payOrder, removeProduct } from './db/db.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the e-commerce API!');
});

app.get('/api/products', (req, res) => {
    getProducts().then(data => {
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ response: 'could not find any products' });
        }
    }).catch(err => {
        res.status(500).json({ response: 'an error occurred while retrieving the products' });
    });
});

app.get('/api/products/:id', (req, res) => {
    getProduct(req.params.id).then(data => {
        if (data !== undefined) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ response: 'could not find your product with this id' });
        }
    }).catch(err => {
        res.status(500).json({ response: 'an error occurred while retrieving the product' });
    });
});

app.post('/api/products', (req, res) => {
    const { title, desc, img, tag, price } = req.body;
    if (!title || !desc || !img || !tag || !price) {
        res.status(400).json({ response: 'missing required fields' });
    } else {
        createProduct(title, desc, img, tag, price).then(() => {
            res.status(200).json({ response: 'product has been added to db' });
        }).catch(err => {
            res.status(500).json({ response: 'an error occurred while creating the product' });
        });
    }
});

app.delete('/api/products/:id', (req, res) => {
    removeProduct(req.params.id).then(() => {
        res.status(200).json({ response: 'product has been removed from db' });
    }).catch(err => {
        res.status(500).json({ response: 'an error occurred while removing the product' });
    });
});

app.all('/api/products', (req, res) => {
    res.status(405).json({ response: 'unsupported HTTP method' });
});

app.post('/api/cart', (req, res) => {
    addToCart(req.body);
    res.status(200).json({ response: 'products have been correctly added to your order' });
});

app.post('/api/orders/:id/pay', (req, res) => {
    payOrder(req.params.id);
    res.status(200).json({ response: 'order has been paid, thank you!' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ response: 'an error occurred while processing the request' });
});

app.listen(8080, () => {
    console.log('Web server running on http://localhost:8080/');
});
