import s from './Root.module.css'
import { Outlet } from "react-router-dom"
import {Link} from 'react-router-dom'
import store from '../store/store'
import { useSelector,useDispatch } from 'react-redux'
import { setUser,deleteUser } from '../store/userLoginSlice'
import { useEffect } from 'react'
import ava from '../assets/ava.png'

store.subscribe(()=>console.log(store.getState()))

export default function Root() {

    const dispatch = useDispatch()

    useEffect(()=>{
        if (JSON.parse(localStorage.getItem('user'))?.user != undefined) {
            dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
        }
    },[])

    const user = useSelector(state => state.loginReducer.user)
    
    const handleDelete = () => {
        dispatch(deleteUser())
        localStorage.clear()
    }

    return (
      
         <div className={s.app}>
        <nav >
            <ul className={s.nav}>
            <Link style={{textDecoration:'none'}} to = './'>
                <li style={{cursor:'pointer'}}>Realworld blog</li>
            </Link>
           {user ? 
           <ul className={s.userNav}>
            <li><Link style={{textDecoration:'none'}} to='/new-article'><button style={{backgroundColor:'#fff'}} className={s.actionBtn}>Create Article</button></Link></li>
            <li className={s.userDetails}><p style={{fontSize:'18px'}}>{user?.user?.username}</p><Link to = '/profile'><img style={{height:'46px'}} src={user?.user?.image ? `${user?.user?.image}` : `${ava}` } alt="user avatar"/></Link></li>
            <li><button onClick={handleDelete} style={{height:'51px',width:'109px',background:'none',border:'1px solid black',borderRadius:'4px',cursor:'pointer'}}>Log Out</button></li>
           </ul>
            :
            <ul className={s.navBtns}>
            <Link style={{textDecoration:'none'}} to = '/sign-in'>
                <li>Sign in</li>
            </Link>
            <Link style={{textDecoration:'none'}} to = '/sign-up'>
                <li className={s.actionBtn}>Sign up</li>
            </Link>
        </ul>   
        }
            </ul>
        </nav>
        <Outlet/>
       </div>
     
    )
}