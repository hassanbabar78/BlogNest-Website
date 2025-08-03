import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import './index.css'
import Home from './components/pages/Home.jsx'
import Login from './components/pages/Login.jsx'
import Signup from './components/pages/Signup.jsx'
import EditPost from './components/pages/EditPost.jsx'
import AllPosts from './components/pages/AllPosts.jsx'
import AddPost from './components/pages/AddPost.jsx'
import CurrentPost from './components/pages/CurrentPost.jsx';
import App from './App.jsx'

import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      },
      {
        path: '/all-posts',
        element: <AllPosts/>
      },
      {
        path: 'add-post',
        element: <AddPost/>
      },
      {
        path: '/edit-post/:slug',
        element: <EditPost/>

      },
      {
        path: '/post/:slug',
        element: <CurrentPost/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <RouterProvider router={router}/>
     </Provider>
  </StrictMode>,
)
