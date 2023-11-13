import express from 'express'
import { getProducts, getProduct, createProduct, addToCart, payOrder, removeProduct } from '../db/db.js'

const router = express.Router()

router.get('/', (req, res) => {
    getProducts().then(data => {
        if (data.length > 0) {
            res.status(200).json(data)
        } else {
            res.status(400).json({ response: 'could not find any products' })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ response: 'internal server error' })
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    getProduct(id).then(data => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(400).json({ response: `could not find product with id ${id}` })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ response: 'internal server error' })
    })
});

router.post('/', (req, res) => {
    const { title, desc, img, tag, price } = req.body
    createProduct(title, desc, img, tag, price)
    res.status(200).json({ response: 'product have been added to db' })
});

router.post('/cart', (req, res) => {
    addToCart(req.body)
    res.status(200).json({ response: 'Articles have been correctly added to your order' });
});

router.post('/:id/pay', (req, res) => {
    payOrder(req.params.id);
    res.status(200).json({ response: 'order have been paid, thank you!' });
});

router.delete('/:id', (req, res) => {
    removeProduct(req.params.id);
    res.status(200).json({ response: 'product have been removed from db' });
});

export default router;
