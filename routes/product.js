import express from 'express'
import { getProducts, getProduct, createProduct, addToCart, payOrder, removeProduct } from '../db/db.js'

const router = express.Router()

router.get('/api/products', (req, res) => {
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

router.get('/api/products/:id', (req, res) => {
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

router.post('/api/products', (req, res) => {
    const product = req.body
    createProduct(product).then(data => {
        res.status(201).json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ response: 'internal server error' })
    })
});

router.post('/api/cart', (req, res) => {
    const { productId, quantity } = req.body
    addToCart(productId, quantity).then(data => {
        res.status(201).json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ response: 'internal server error' })
    })
});

router.post('/api/orders', (req, res) => {
    const { cartId, paymentMethod } = req.body
    payOrder(cartId, paymentMethod).then(data => {
        res.status(201).json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ response: 'internal server error' })
    })
});

router.delete('/api/products/:id', (req, res) => {
    const id = req.params.id
    removeProduct(id).then(data => {
        if (data) {
            res.status(200).json({ response: `product with id ${id} deleted` })
        } else {
            res.status(400).json({ response: `could not find product with id ${id}` })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ response: 'internal server error' })
    })
});

export default router;
