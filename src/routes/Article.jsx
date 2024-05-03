/* eslint-disable react/prop-types */
import s from './Article.module.css'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector } from 'react-redux'
import { setSlug } from '../store/bigArticlesSlice'

export default function Article({description,author,title,slug,tagList,createdAt}) {

    const dispatch = useDispatch()
    let date = new Date(createdAt)
    let year = date.getFullYear()
    let month =  date.toLocaleString('default', { month: 'long' });

    const articlesLoading = useSelector(state => state.articlesReducer.loading)
    
    const inactive = articlesLoading ? 'none' : ''

    const greyBorder = '1px solid grey'
    const blackBorder = '1px solid black'
    const greyColor = 'grey'
    const blackColor = 'black'

    const {username,image} = author
    return (
        <article className={s.article}>
            
                <div className={s.details}>
                    <Link style={{textDecoration:'none',pointerEvents:`${inactive}`}} to = {`articles/article/${slug}`}>         
                            <h5  onClick={() => dispatch(setSlug(slug))} style={{width:'fit-content'}} className={s.articleHeader}>{title}</h5> 
                    </Link>
                
                   <ul  className={s.tags}>
                   {tagList.map((item,i)=>{
                    
                    let border = i === 0 ? blackBorder : greyBorder
                    let color = i === 0 ? blackColor : greyColor

                    return (<li style={{display:'flex',alignItems:'center',border:`${border}`,borderRadius:'3px',color:`${color}`,padding:'2%',margin:'0 5px 0 5px'}} key={i}>{item}</li>)
                    })}
                   </ul>
                
                   <p>
                    {description}
                   </p>
                </div>
            
            <div className={s.userInfo}>
                <div className={s.userDetails}>
                <span>{username}</span>
                <span>{`${month} ${year}`}</span>
                </div>
                <img className={s.avatar} src={`${image}`} alt="" />
            </div>
        </article>
    )
}

