import React, {useState, useEffect} from 'react'
import PostCard from '../PostCard';
import dataServices from '../../appWrite/Database';
import { useParams } from 'react-router-dom';
import Loader from '../Loader'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const {slug} = useParams();
    useEffect(() => {
        dataServices.getAllActivePosts().then((response) => {
        if(response){
            setPosts(response.documents);
            setLoading(false);
        }
    })
    },[slug])

    if(loading){
        return (
            <div class=" w-full h-[75vh] flex justify-center items-center hover:cursor-pointer">
                    <Loader/>
            </div>
        );
    }
  return (
    <div className=' w-screen h-auto flex flex-wrap gap-x-5 gap-y-5 px-7 py-7'>
        {posts.map((post) => (
            <div key={post.$id} className='w-[32%] h-[45vh]' >
                <PostCard {...post} />
            </div>
        ))}
    </div>
  )
}

export default AllPosts