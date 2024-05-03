
import { Spin } from 'antd'
import s from './BigArticle.module.css'
import {useSelector,useDispatch} from 'react-redux'
import { fetchArticle } from '../services/services'
import { useEffect } from 'react'
import ServerErrorMessage from '../components/ServerError/ServerErrorMessage'

export default function BigArticle() {

    const slug = useSelector(state => state.bigArticleReducer.slug);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchArticle(slug))
    },[slug])

    const article = useSelector(state => state.bigArticleReducer.currentArticle);
    const loading = useSelector(state => state.bigArticleReducer.loading);
    const error = useSelector(state => state.bigArticleReducer.error);
    

    return (
        <>
        {error ?  <ServerErrorMessage error={error}/> 
        :
        <div className={s.articleContainer}>
        {loading ? <Spin size='large' style={{marginTop:'10%'}}/> : <div className={s.bigArticle}>
            <h1>{article?.title}</h1>
            {article?.body}
        </div>}
        
        </div> } 
        </>
       
    )
}


