import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import dataServices from '../appWrite/Database'

function PostCard({$id, title, featuredImage}) {
   const [imageUrl, setImageUrl] = useState(""); 
   try {
        dataServices.getFilePreview(featuredImage)
        .then((url) => {
            console.log("Preview object:", url); 
            setImageUrl(url);
            console.log("Image URL set:", url); 
        })
        
    } catch (err) {
        console.error("Error loading preview:", err);
    }
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'> 
                <img src={imageUrl} alt={"title"}
                className=' rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard