import s from './Root.module.css'
import { Outlet } from "react-router-dom"
import {Link} from 'react-router-dom'
import store from '../store/store'
import { useSelector,useDispatch } from 'react-redux'
import { setUser,deleteUser } from '../store/userLoginSlice'
import { useEffect } from 'react'


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
            <li>Realworld blog</li>
           {user ? 
           <ul className={s.userNav}>
            <li><button style={{backgroundColor:'#fff'}} className={s.actionBtn}>Create Article</button></li>
            <li className={s.userDetails}><p style={{fontSize:'18px'}}>{user?.user?.username}</p><img style={{height:'46px'}} src={`${user?.user?.image}`} alt="user avatar"/></li>
            <li><button onClick={handleDelete} style={{height:'51px',width:'109px',background:'none',border:'1px solid black',borderRadius:'4px',cursor:'pointer'}}>Log Out</button></li>
           </ul>
            :
            <ul className={s.navBtns}>
            <Link to = '/sign-in'>
                <li>Sign in</li>
            </Link>
            <Link to = '/sign-up'>
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