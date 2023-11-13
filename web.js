import express from 'express'
import { getProducts, getProduct, createProduct, addToCart, payOrder, removeProduct } from './db/db.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
});

app.get('/', (req, res) => {
    res.send('Welcome to the e-commerce API!')
});

app.get('/api/products', (req, res) => {
    getProducts().then(data => {
        if (data.length > 0) {
            res.status(200).json(data)
        } else {
            res.status(400).json({ response: 'could not find any products' })
        }
    });
});

app.get('/api/products/:id', (req, res) => {
    getProduct(req.params.id).then(data => {
        if (data !== undefined) {
            res.status(200).json(data);
        } else {
            res.status(400).json({ response: 'could not find your product with this id' });
        }
    });
});

app.post('/api/products', (req, res) => {
    const { title, desc, img, tag, price } = req.body
    createProduct(title, desc, img, tag, price)
    res.status(200).json({ response: 'product have been added to db' })
})

app.delete('/api/products/:id', (req, res) => {
    removeProduct(req.params.id);
    res.status(200).json({ response: 'product have been removed from db' });
});

app.post('/api/cart', (req, res) => {
    addToCart(req.body);
    res.status(200).json({ response: 'products have been correctly added to your order' });
});

app.post('/api/orders/:id/pay', (req, res) => {
    payOrder(req.params.id);
    res.status(200).json({ response: 'order have been paid, thank you!' });
});

app.use((req, res) => {
    res.status(404).json({ message: `API not found at ${req.url}` });
});

app.listen(8080, () => {
    console.log('Web server running on http://localhost:8080/');
});
