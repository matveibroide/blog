import { useEffect, useState } from 'react'
import s from './NewArticle.module.css'
import {useForm} from 'react-hook-form'
import { postArticle } from '../services/services'
import { useSelector } from 'react-redux'

export default function NewArticle() {

    const {watch,reset,register,handleSubmit,formState:{errors}} = useForm({defaultValues:{
        title:'',
        description:'',
        text:''

    }})


    const createId = () => "id" + Math.random().toString(16).slice(2)
    
    const [tags,setTags] = useState([{value:'',clicked:false,id:createId()}])
    const [error,setError] = useState(null)
    const [success,setSuccess] = useState(null)

    const addTag = (tagName, id) => {
        setTags(prevTags => {
            const updatedTags = prevTags.map(item => {
                if (item.id === id) {
                    return { ...item, clicked: true, value: tagName };
                } else {
                    return item;
                }
            });
    
            return [...updatedTags, { value: '', clicked: false, id: createId() }];
        });
    };

    const handleChange = (event, id) => {
        const { value } = event.target;
        
        setTags(prevTags => {
            return prevTags.map(tag => {
                if (tag.id === id) {
                    return { ...tag, value: value };
                } else {
                    return tag;
                }
            });
        });
    };

    const deleteTag = (id) => {  
        if (tags.length === 1) {
           setTags([[{value:null,clicked:false,id:createId()}]])
           alert('Atleast one tag should remain')
           return
        }
        setTags(prev => prev.filter(item => item.id != id))
    }

    const token = useSelector(state => state.loginReducer.user?.user?.token)
    
    return (
        <div className={s.formContainer}>
            <form className={s.form} action="" onSubmit={handleSubmit((data)=>{
                const {title,description,text} = data
                const articleTags = tags.reduce((acc,next)=>{
                  if (next.value !== '') {
                    acc.push(next.value)
                  }  
                  return acc
                },[])
                console.log(articleTags)
                postArticle({
                    article:{
                        title:title,
                        description:description,
                        body:text,
                        tagList:articleTags
                    }
                },token).then(data => setSuccess(true))
            })}>
                <ul className={s.formInnerWrapper}>
                    <li><h1 style={{textAlign:'center'}}>Create new article</h1></li>
                    <li className={s.listItem}>
                        Title
                        <input className={s.formInput} {...register('title',{})} type="text" placeholder='Title' />
                    </li>
                    <li className={s.listItem}>
                    Short description
                    <input className={s.formInput} {...register('description',{})} type="text" placeholder='Title' />
                    </li>
                    <li className={s.listItem}>
                    Text
                    <input style={{height:'168px'}} className={s.formInput} {...register('text',{})} type="text" placeholder='Title' />
                    </li>
                    <li className={s.listItem}>
                        Tags
                        <ul style={{width:'80%',listStyle:'none',padding:'0'}}>
                            {tags.map((item,i)=>{
                                return (
                                <li className={s.tagsItem} key = {item.id}>
                                <input readOnly = {item.clicked ? `readonly` : ``} className={s.formInput}  onChange={event => handleChange(event, item.id)} id = {item.id} value={tags[i]?.value || ''} type="text" />
                               <div className={s.tagsBtns}>
                                   {!item.clicked ? <button className= {s.formAddBtn} id={item.id}  onClick={(e) => {
                                        e.preventDefault()
                                   
                                        addTag(item.value,item.id)
                                    }}>Add tag</button> : null}
                                    <button className = {s.formDestroyBtn} onClick={(e)=>{
                                        e.preventDefault(e)
                                        deleteTag(item.id)
                                    }} id={item.id}>delete</button>
                               </div>
                                </li>
                                )
                            })}
                        </ul>
                    </li>
                    <li>
                        <button className={s.formSubmitBtn}>Send</button>{success ? <p style={{color:'green'}}>Article created!</p> : null}
                    </li>
                </ul>
            </form>
        </div>
    )
}