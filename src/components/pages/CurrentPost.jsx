
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import dataServices from "../../appWrite/Database";
import Button from "../Button";
import Loader from "../Loader";

function CurrentPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const [imageUrl, setImageUrl] = useState(""); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userData = useSelector((state) => (state.auth.userData));
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            console.log("The value of the slug: ", slug);
            dataServices.getPost(slug).then((currPost) => {
                if (currPost){
                    setPost(currPost);
                    if(currPost.featuredImage){
                        try {
                            dataServices.getFilePreview(currPost.featuredImage)
                            .then((url) => {                         
                                setImageUrl(url);
                                setLoading(false);
                            })
                        } catch (err) {
                            console.error("Error loading preview:", err);
                        }
                    }
                }else 
                    navigate("/");
            });
        } else
             navigate("/");
    }, [slug, navigate]);
   
    const deletePost = () => {
        dataServices.deletePost(post.$id).then((status) => {
            if (status) {
                const deleteFile = dataServices.deleteFile(post.featuredImage);
                if(deleteFile){
                    alert("The post has been deleted successfully!!!");
                    navigate("/");
                }
            }
        });
    };
    if(loading){
        return (
            <div class=" w-full h-[75vh] flex justify-center items-center hover:cursor-pointer">
                <Loader/>
            </div>
        );
    }

    return post ? (
        <div className="px-7 py-7"> 
            <div className="w-full flex justify-center relative rounded-xl p-2">
                {post.featuredImage && (
                    <img
                    src={imageUrl}
                    alt={post.title}
                    className="rounded-xl"                     
                    />              
                )}
                {isAuthor && (
                    <div className="absolute right-7 top-7">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-600 hover:bg-green-700" className="mr-3 transform transition-transform duration-200 hover:scale-110">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500 hover:bg-red-700" onClick={deletePost} className="transform transition-transform duration-200 hover:scale-110">
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full h-[12vh] flex justify-center items-center text-white leading-tight ">
                <h1 className="text-3xl font-medium">{post.title}</h1>
            </div>
            <div className="prose prose-lg max-w-none bg-white dark:bg-gray-300 text-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:cursor-pointer">
                    {parse(post.content)}
            </div>
            

            
        </div>
    ) : null;
}

export default CurrentPost