import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsContextProvider from './data/products-context.jsx';
import NewProduct from './pages/newProduct/NewProduct.jsx';
import NewSupplier from './pages/newSupplier/NewSupplier.jsx';





const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/new-product",
    element: <NewProduct/>,
  },
  {
    path: "/new-supplier",
    element: <NewSupplier/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductsContextProvider>
      <RouterProvider router={router} />
    </ProductsContextProvider>
  </React.StrictMode>
)
