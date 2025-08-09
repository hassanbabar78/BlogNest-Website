import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import dataServices from '../../appWrite/Database';
import PostForm from '../PostForm/PostForm';
import Loader from '../Loader';

function EditPost() {
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true)
    const {slug} = useParams();

    useEffect(() => {
        if(slug){
        dataServices.getPost(slug).then((currPost) => {
            if(currPost){
                setPost(currPost);
                setLoading(false);
            }
        })
    }else{
        navigate('/')
    }
    },[slug,navigate])

    if(loading){
        return (
           <div class=" w-full h-[75vh] flex justify-center items-center hover:cursor-pointer">
                <Loader/>
            </div>
        );
    }
    
  return post? (
    <div className='py-8'>
        <PostForm post={post} />
    </div>
  ): null
}

export default EditPost
