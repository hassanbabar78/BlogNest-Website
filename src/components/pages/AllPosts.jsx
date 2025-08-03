import React, {useState, useEffect} from 'react'
import PostCard from '../PostCard';
import dataServices from '../../appWrite/Database';
import { useParams } from 'react-router-dom';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const {slug} = useParams();
    useEffect(() => {
        dataServices.getAllPosts().then((response) => {
        if(response){
            setPosts(response.documents);
            setLoading(false);
        }
    })
    },[slug])

    if(loading){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <h1 className="text-xl font-medium text-gray-900">The data is Loading...</h1>
            </div>
        );
    }
  return (
    <div className='w-full py-8'>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default AllPosts