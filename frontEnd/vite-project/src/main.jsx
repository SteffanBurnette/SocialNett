import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider,
   Route, createRoutesFromElements} from 'react-router-dom';

//My layouts
import RootLayout from "./layouts/RootLayout"
import MainLayout from "./layouts/MainLayout"
import AdviceLayout from "./layouts/AdviceLayout"
import GoalsLayout from "./layouts/GoalsLayout"

//Construting the router variable that will hold all of the routes
const router = createBrowserRouter(
          createRoutesFromElements(
            <>
            <Route path = "/" element = {<RootLayout/>}/>
            <Route path = "mainpage" element = {<MainLayout/>}/>
            <Route path = "advicepage" element = {<AdviceLayout/>}/>
            <Route path = "goalpage" element = {<GoalsLayout/>}/>
            </>
          )
)






ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
