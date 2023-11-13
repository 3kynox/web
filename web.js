import express from 'express'
import productRoute from './routes/product.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use('/api/products', productRoute)
app.use((req, res) => {
    res.status(404).json({ message: `API not found at ${req.url}` });
});

app.listen(8080, () => {
    console.log('Server started on port 8080')
})
