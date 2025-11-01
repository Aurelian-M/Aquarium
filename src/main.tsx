import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.tsx'
import Welcome from './pages/Welcome.tsx'
import MainWebsite from './pages/MainWebsite.tsx'
import ContextProvider from './context/ProductsContext.tsx'

import { AuthProvider } from './context/authContext.tsx'
import FetchPage from './components/FetchPage.tsx'
import { PaginationProvider } from './context/Paginationcontext.tsx'
import SingleCard from './components/SingleCard.tsx'
import AQUARIUM from './pages/AQUARIUM.tsx'
import AdminPage from './pages/AdminPage.tsx'
import CartPage from './pages/CartPage.tsx'
import ProductsData from './adminComponents/ProductsData.tsx'
import UsersData from './adminComponents/UsersData.tsx'
import AddProductForm from './adminComponents/AddProductsForm.tsx'

 const router = createBrowserRouter([
  {
     path: '/',
     element:<App />,
     errorElement: <ErrorPage />,
     children:[
      { index: true, element: <Welcome />},
      { path: 'mainweb', element: <MainWebsite />},
      ]
    },
    { path: 'fetchpage', element: <FetchPage />},
    { path: 'item/:id',element: <SingleCard />},
    { path: 'aquarium',element: <AQUARIUM />},
    { path: 'admin',element: <AdminPage />,
      children:[
        {path: 'products', element: <ProductsData/>},
        {path: 'users', element: <UsersData/>},
        {path: 'addproducts', element: <AddProductForm/>}
        
      ]
    },
    { path: 'cart',element: <CartPage />}, 
      ],{
     
      basename: '/aquarium',
}) 

 createRoot(document.getElementById('root')!).render(
  <AuthProvider>
   <ContextProvider>
    <PaginationProvider>
     <RouterProvider router={router} />
    </PaginationProvider>
   </ContextProvider>
  </AuthProvider>
) 