import s from './ServerErrorMessage.module.css'

export default function ServerErrorMessage({error}) {
    return (
        <div className={s.errorMessageContainer}><p className={s.errorMessage}>Sorry something gone wrong... {error?.message}</p></div> 
    )
}