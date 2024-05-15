
import Articles from './routes/Articles';
import BigArticle from './routes/BigArticle';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root';
import ErrorPage from './ErrorPage';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';
import { Provider } from 'react-redux';
import store from './store/store';
import Profile from './routes/Profile';
import NewArticle from './routes/NewArticle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:'/',
        element:<Articles/>,
        errorElement:<ErrorPage/>,
      },
      {
        path:'/articles/article/:slug',
        element:<BigArticle/>,
        errorElement:<ErrorPage/>,
      },
      {
        path:'/sign-up',
        element:<SignUp/>,
        errorElement:<ErrorPage/>
      },
      {
        path:'/sign-in',
        element:<SignIn/>,
        errorElement:<ErrorPage/>
      },
      {
        path:'/profile',
        element:<Profile/>,
        errorElement:<ErrorPage/>
      },
      {
        path:'/new-article',
        element:<NewArticle type = {'new'}/>,
        errorElement:<ErrorPage/>
      },
      {
        path:'/articles/:slug/edit',
        element:<NewArticle/>,
        errorElement:<ErrorPage/>
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
