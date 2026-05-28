import React, { lazy, Suspense } from 'react'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import AddProduct from './components/Product/AddProduct'
const ProductCard = lazy(() => import('./components/Product/ProductCard'))  
import Cart from './components/Cart/Cart'
import About from './components/About/About'
import ProductDetails from './components/Product/ProductDetails'
import Contact from './components/Contact/Contact'
const MyProducts = lazy(() => import('./components/Product/MyProducts'))
import CheckOut from './components/CheckOut/CheckOut'
import ProfileSkeleton from './components/Profile/ProfileSkeleton'
import MyOrdersSkeleton from './components/MyOrders/MyOrdersSkeleton'
import ProductCardSkeleton from './components/Product/ProductCardSkeleton'
import MyProductsSkeleton from './components/Product/MyProductsSkeleton'
// import MyOrders from './components/MyOrders/MyOrders'
const MyOrders = lazy(() => import('./components/MyOrders/MyOrders'))
// import Profile from './components/Profile/Profile'
const Profile = lazy(() => import('./components/Profile/Profile'))
import Orders from './components/MyOrders/Orders'
import AllUsers from './components/Admin/AllUsers'

function App() {




  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/user/signup' element={<Signup />} />
        <Route path='/user/signin' element={<Login />} />
        <Route path='/product/add' element={<AddProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product' element={
          <Suspense fallback={
            //  <div className="flex justify-center items-center h-screen">
            //   <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#cda454]"></div>
            // </div>
            <ProductCardSkeleton />
          }>
            <ProductCard />
          </Suspense>
        } />
        <Route path='/product/view/:id' element={<ProductDetails />} />
        <Route path='/product/mine/:id' element={
          <Suspense fallback={<MyProductsSkeleton />}>
            <MyProducts />
          </Suspense>
        } />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/checkout' element={<CheckOut />} />
        <Route path='/my-orders/:id' element={
          <Suspense fallback={
            // <div className="flex justify-center items-center h-screen">
            //   <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#cda454]"></div>
            // </div>
            <MyOrdersSkeleton />
          }>
            <MyOrders />
          </Suspense>} />
        <Route path='/my-orders/sell/:id' element={<Orders/>}/>

        <Route path='/profile' element={
          <Suspense fallback={
            // <div className="flex justify-center items-center h-screen">
            //   <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#cda454]"></div>
            // </div>
            <ProfileSkeleton />
          }>
            <Profile />
          </Suspense>} />
          <Route path='/admin/getAllUsers' element={<AllUsers/>}/>

      </Route>
    )
  )


  return (
    <>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </>
  )
}

export default App
