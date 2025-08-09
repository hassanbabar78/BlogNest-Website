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
        <div className='w-full h-full bg-[#D4D4D4] rounded-xl text-black px-3 py-3'>
            <div className='w-full h-[87%]'> 
                <img src={imageUrl} alt={"title"}
                className='w-full h-full rounded-xl object-cover' />
            </div>
            <h2
            className='h-[13%] flex items-center text-xl font-normal'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard