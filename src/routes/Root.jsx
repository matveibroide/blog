import s from './Root.module.css'
import { Outlet } from "react-router-dom"
import {Provider} from 'react-redux'
import {Link} from 'react-router-dom'
import store from '../store/store'
import { useSelector } from 'react-redux'


store.subscribe(()=>console.log(store.getState()))

export default function Root() {

    const {user} = useSelector(state => state.loginReducer.user)
    
 

    return (
      
         <div className={s.app}>
        <nav >
            <ul className={s.nav}>
            <li>Realworld blog</li>
           {user ? 
           <ul className={s.userNav}>
            <li><button>Create Article</button></li>
            <li>{user?.username}</li>
            <li><button>Log Out</button></li>
           </ul>
            :
            <ul className={s.navBtns}>
            <Link to = '/sign-in'>
                <li>Sign in</li>
            </Link>
            <Link to = '/sign-up'>
                <li className={s.signupBtn}>Sign up</li>
            </Link>
        </ul>   
        }
            </ul>
        </nav>
        <Outlet/>
       </div>
     
    )
}