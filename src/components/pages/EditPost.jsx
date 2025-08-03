import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import dataServices from '../../appWrite/Database';
import PostForm from '../postForm/postForm';

function EditPost() {
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const {slug} = useParams();

    useEffect(() => {
        if(slug){
        dataServices.getPost(slug).then((currPost) => {
            if(currPost){
                setPost(currPost);
            }
        })
    }else{
        navigate('/')
    }
    },[slug,navigate])
    
  return post? (
    <div className='py-8'>
        <PostForm post={post} />
    </div>
  ): null
}

export default EditPost
