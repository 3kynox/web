import { readFile, writeFile } from 'node:fs/promises'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePathProducts = path.join(__dirname, 'products.json')
const filePathOrders = path.join(__dirname, 'orders.json')

const readProducts = () => {
    return readFile(filePathProducts, 'utf-8')
}

const writeProducts = (products) => {
    return writeFile(filePathProducts, JSON.stringify(products))
}

const readOrders = () => {
    return readFile(filePathOrders, 'utf-8')
}

const writeOrders = (order) => {
    return writeFile(filePathOrders, JSON.stringify(order))
}

const getOrders = () => {
    return readOrders()
        .then((data) => {
            if (!data) {
                return data = []
            } else {
                return data = JSON.parse(data)
            }
        })
}

const getProducts = () => {
    return readProducts()
        .then((data) => {
            if (!data) {
                return data = []
            } else {
                return data = JSON.parse(data)
            }
        })
}

const getProduct = (id) => {
    return readProducts()
        .then((data) => {
            const products = JSON.parse(data);
            const product = products.find(p => p.id === id);
            return product;
        });
};

function createProduct(title, desc, img, tag, price) {
    return new Promise((resolve, reject) => {
        readProducts().then(data => {
            const newProduct = {
                id: Math.floor(Math.random() * 100000).toString(),
                title,
                desc,
                img,
                tag,
                price
            };

            data.push(newProduct);
            
            writeProducts(data).then(() => {
                resolve();
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

const addToCart = (articles) => {
    const id = Math.floor((1 + Math.random()) * 0x10000).toString().substring(1)

    const newCart = {
        id,
        articles
    }

    return getOrders().then((data) => {
        data.push(newCart)
        return writeOrders(data)
    })
}

const payOrder = (id) => {
    getOrders().then((data) => {
        const filteredOrders = data.filter(order => order.id != id)
        writeOrders(filteredOrders)
    })
}

const removeProduct = (id) => {
    getProducts().then((data) => {
        const filteredProducts = data.filter(product => product.id != id)
        writeProducts(filteredProducts)
    })
}

export { getProducts, getProduct, createProduct, addToCart, payOrder, removeProduct }
