import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Result from './Result.jsx'
import ShortList from './ShortList.jsx'
import Verification from './Verification.jsx';
import '../style/normalize.css'
import '../style/sidebar.css'
import '../style/index.css'
import '../style/verification.css'
import '../style/result.css'
import '../style/shortlist.css'


const router = createBrowserRouter([
  { 
      path: "/",
      element: <App />,
      children: [
        {path: "result" , element: <Result />},
        {path: "verification" , element: <Verification />},
      ]   
  },{
    path:"/result/shortlist",
    element:<ShortList />
  }
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </RouterProvider>
  </React.StrictMode>,
)
