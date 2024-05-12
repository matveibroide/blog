import s from './AlertSuccess.module.css'

export default function AlertSuccess({message}) {
    return (
        <div className={s.successContainer} >
            <p className={s.successMessage}>{message}</p>
        </div>
    )
}