// main.tsx or main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App'
import SignIn from '../src/SignIn.jsx'
import SignUp from '../src/SignUp.jsx'
import Resume from '../src/Resume.jsx'
import Job from '../src/Job.jsx'
import ShortList from '../src/ShortList.jsx';
import '../style/index.css'
import '../style/hero.css'
import '../style/nav.css'
import '../style/signin.css'
import '../style/personal.css'
import '../style/work.css'
import '../style/resume.css'
import '../style/job.css'
import '../style/shortlist.css'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "resume",
    element: <Resume />,
  },
  {
    path: "job",
    element: <Job />,
  },
  {
    path: "/job/shortlist",
    element: <ShortList />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </RouterProvider>
  </React.StrictMode>,
)