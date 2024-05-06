import s from './SignIn.module.css'
import {useForm} from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux'
import { signIn } from '../services/services'
import { useNavigate } from "react-router-dom";



export default function SignIn() {

    const {register,watch,handleSubmit,reset,formState:{errors}} = useForm({defaultValues:{
        email:'',
        password:'',  
    }})

    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const error = useSelector(state => state.loginReducer.error)
    const user = useSelector(state => state.loginReducer.user)

    
    if (user) {
        navigate("/", { replace: true });
    }


    return (
        <div className={s.formContainer}>
            <form onSubmit={handleSubmit((data)=>{
         
                dispatch(signIn({user:{
                    ...data
                }}))
                reset()
            })} className={s.form} action="">
                <ul className ={s.formInnerWrapper}>
                    <li>
                        <h2 style={{margin:'0 auto',textAlign:'center'}}>Sign In</h2>
                    </li>
                    <li className={s.listItem}>
                        Email addres
                        <input className={s.input} placeholder='Email addres' {...register('email')} type="email" />
                    </li>
                    <li className={s.listItem}>
                        Password
                        <input className={s.input} placeholder='Password' {...register('password')} type="password" />
                    </li>
                    <li className={s.listItem}>
                        <button style={{height:'40px'}} className={s.formBtn}>Login</button>
                    </li>
                    <li>
                    <p style={{fontSize:'12px',color:'#8C8C8C',textAlign:'center'}}>Dont have an account <span style={{color:'#1890FF'}}>Sign Up</span></p>
                    </li>
                {error && !user ? <p style={{color:'red',textAlign:'center'}}>Could not sign in...Try again</p> : null }
                </ul>
              
            </form>

        </div>
    )
}