import React, {useEffect, useState} from 'react'
import authServices from '../../appWrite/Auth'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from '../PostCard'
import { login } from '../../store/authSlice'
import dataServices from '../../appWrite/Database'

function Home() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    let hasPost = false;
    const dispatch = useDispatch();

    useEffect(() => {
        
        authServices.getCurrentUser()
        .then((currUser) =>{
            if(currUser){
                dispatch(login(currUser));
                setUser(currUser.$id);
                dataServices.getAllPosts()
                        .then((posts) => {
                            if(posts){
                                setPosts(posts.documents);
                            }
                        })
            }else{
                return null;
            }
        })
    }, [])

    if(!user){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Please login to read posts
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
    for(const post of posts){
        post.userId === user ? hasPost=true : null;
    }
  
    if (user && !hasPost) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                             There are no posts at the moment 
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    post.userId === user ?( 
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>): null
                ))}
            </div>
        </div>
    )
}

export default Home