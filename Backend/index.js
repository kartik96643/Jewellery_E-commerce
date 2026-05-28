const express = require('express');
const {connectToMongo} = require('./connection.js')
const userRoute = require('./routes/user.js');
const productRoute = require('./routes/product.js')
const cartRoute = require('./routes/cart.js')
const checkoutRoute = require('./routes/checkout.js')
const orderRoute = require('./routes/orders.js')
const profileRoute = require('./routes/profile.js')
const adminRoute = require('./routes/admin.js')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const { checkToken } = require('./middleware/auth.js');
const cookieParser = require('cookie-parser')

const app = express();
const PORT = process.env.PORT

connectToMongo();

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(
  "/productsImages",
  express.static(path.join(__dirname, "./productsImages"))
);
app.use(checkToken())


app.use('/user', userRoute)

app.use('/product',productRoute)

app.use('/cart', cartRoute)

app.use('/checkout', checkoutRoute)

app.use('/my-orders', orderRoute)

app.use('/profile', profileRoute)

app.use('/admin', adminRoute)

app.listen(PORT, ()=>{
console.log("server started")
});

