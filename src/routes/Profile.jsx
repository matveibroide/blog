import s from './Profile.module.css'
import { updateUser } from '../services/services'
import { Form,useForm } from "react-hook-form"
import { useDispatch,useSelector } from 'react-redux'
import ServerErrorMessage from '../components/ServerError/ServerErrorMessage'
export default function Profile() {

    const dispatch = useDispatch()

    const {register,watch,handleSubmit,reset,formState:{errors}} = useForm({defaultValues:{
        name:'',
        email:'',
        password:'',
        avatar:'',
    }})

    const token = useSelector(state => state.loginReducer?.user?.user?.token)
    const error = useSelector(state => state.updateUserReducer.error);

    return (
        <div className={s.formContainer}>
           {error ? <ServerErrorMessage error={error}/> :
            <form onSubmit={handleSubmit((data)=>{
                const {name,email,password,avatar} = data

                dispatch(updateUser({user:{
                    username:name,
                    email:email,
                    bio:password,
                    image:avatar   
                }},token))

               
                
            })} className={s.form} action="">
                <ul className={s.formInnerWrapper}>
                    <li><h2 style={{textAlign:'center'}}>Edit profile</h2></li>
                    <li className={s.listItem}>
                        <p>Username</p>
                        <input {...register('name',{required:'This is required field',minLength:{value:3,message:'The min length is 3 symbols'},maxLength:{value:20,message:'The max length is 20 symbols'}})} placeholder="Username" type="text" />
                        {errors.name?.message ? <p style={{color:'red'}}>{errors.name?.message}</p> : null}
                    </li>
                    <li className={s.listItem}>
                        <p>Email address</p>
                        <input {...register('email')} placeholder="Email address" type="text" />
                    </li>
                    <li className={s.listItem}>
                        <p>New password</p>
                        <input {...register('password',{required:'This is required field',minLength:{value:6,message:'The min length is 6 symbols'},maxLength:{value:40,message:'The max value is 40 symbols'}})} placeholder="New password" type="text" />
                        {errors.password?.message ? <p style={{color:'red'}}>{errors.password?.message}</p> : null}
                    </li>
                    <li className={s.listItem}>
                        <p>Avatar image(url)</p>
                        <input {...register('avatar')} placeholder="Avatar image" type="url" />
                    </li>
                    <li><button type='submit'>Save</button></li>
                </ul>
            </form>}
        </div>
    )
}