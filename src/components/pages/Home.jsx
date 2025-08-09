

import React, {useEffect, useState} from 'react'
import authServices from '../../appWrite/Auth'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from '../PostCard'
import { login } from '../../store/authSlice'
import dataServices from '../../appWrite/Database'
import Loader from '../Loader'

function Home() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    let isLogged = useSelector((state) => (state.auth.status));
    let hasPost = false;

    useEffect(() => {
    const fetchData = async () => {
        try {
                if(isLogged){
                    const currUser = await authServices.getCurrentUser();
                    setUser(currUser.$id);
                    const response = await dataServices.getAllPosts();
                    if (response) {
                        setPosts(response.documents);
                    }
                }else{
                    setUser(null);
                    setPosts([]);
                }
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchData(); 
}, [isLogged]);

    if (loading) {
        return (
            <div class=" w-full h-[75vh] flex justify-center items-center hover:cursor-pointer">
                  <Loader/>
            </div>
        );
    }
    if(!user){
        return (
                
            <div class=" w-full h-[75vh] flex justify-center items-center text-2xl text-red-700 font-medium animate-pulse hover:cursor-pointer">
                  🚫 You are not logged in. Please log in to see posts.
            </div>
        )
    }
    for(const post of posts){
        post.userId === user ? hasPost=true : null;
    }
  
    if (user && !hasPost) {
        return (
            <div class=" w-full h-[75vh] flex justify-center items-center text-2xl text-violet-50 font-medium animate-pulse hover:cursor-pointer">
                  There are no posts at the moment
            </div>
        )
    }
    return (
        <div className=' w-screen h-auto flex flex-wrap gap-x-5 gap-y-5 px-7 py-7'>
            {posts.map((post) => (
                post.userId === user ?( 
                 <div key={post.$id} className='w-[32%] h-[45vh]'>
                    <PostCard {...post} />
                </div>): null
            ))}
        </div>
    )
}

export default Home