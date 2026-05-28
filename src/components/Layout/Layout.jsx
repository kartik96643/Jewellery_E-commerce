import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Provider } from 'react-redux'
import {store, persistor} from '../../store/store'
import { PersistGate } from "redux-persist/integration/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Layout() {
  return (
   <>   
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
   <Header/>
    <ToastContainer position="top-right" autoClose={2000} />
   <Outlet/>
   <Footer/>
   </PersistGate>
   </Provider>
   </>
  )
}

export default Layout
