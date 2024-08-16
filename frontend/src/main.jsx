import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Avis from './Avis.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: 'localhost:8080/api/sentiment',
    element: <Avis/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>,
)
