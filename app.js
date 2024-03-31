const express = require('express');
const app = express();
const port = 3000;
// const cors = require('cors');

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1000, stock: 5 },
  { id: 2, name: 'Phone', category: 'Electronics', price: 500, stock: 10 },
];

// app.use(cors());
// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Middleware for parsing JSON
app.use(express.json());

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET a single product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

// POST a new product
app.post('/products', (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.stock) {
    res.status(404).send('Please specify the product name ,price or stock of the product.');
  }

  if ((Number.isInteger(req.body.price)) & (Number.isInteger(req.body.stock))) {
    if (!req.body.category) {
      const newProduct = {
        id: products.length + 1,
        name: String(req.body.name),
        category: "-",
        price: req.body.price,
        stock: req.body.stock
      };
      products.push(newProduct);
      res.json(newProduct);
      console.log(newProduct);
    }
    else {
      const newProduct = {
        id: products.length + 1,
        name: String(req.body.name),
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock
      };
      products.push(newProduct);
      res.json(newProduct);
      console.log(newProduct);
    }
  }
  else {
    return res.status(404).send('price and stock must be Number');
  }

});

// PUT update product details
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  let product_category = String(req.body.category)
  let product_name = String(req.body.category)

  if (!product) return res.status(404).send('Product not found');

  if (!req.body.category) product_category = product.category ;
  if (!req.body.name) product_name = product.name ;

  if ((Number.isInteger(req.body.price)) & (Number.isInteger(req.body.stock))) {
    product.name = product_name
    product.category = product_category
    product.price = req.body.price
    product.stock = req.body.stock
  }
  else {
    res.status(404).send('Please specify price and stock of the product(Must be Number).');
  }


  res.json(product);
});

// DELETE delete a product 
app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send('Product not found');

  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct);
});


app.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});
