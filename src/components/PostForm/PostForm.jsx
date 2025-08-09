import React, { useState } from 'react'
import { useEffect, useCallback } from 'react'
import Button from '../Button'
import Select from '../Select'
import Input from '../Input'
import RealTimeEditor from '../Editor'
import dataServices from '../../appWrite/Database'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'


function PostForm({post}) {
    const {register, handleSubmit, watch, control, setValue, getValues} = useForm({
        defaultValues:{
            title: post?.title || " ",
            slug: post?.slug || " ",
            content: post?.content || " ",
            status: post?.status || "active",
        }
    });
    const navigate = useNavigate();
    const userData = useSelector((state)=> (state.auth.userData));
    const [imageUrl, setImageUrl] = useState("");
     try {
        dataServices.getFilePreview(post.featuredImage)
        .then((url) => {
            setImageUrl(url);
        })
        
    } catch (err) {
        console.error("Error loading preview:", err);
    }

    const submit =  async (data) =>{
        if(post){
            const file = data.image[0]? await dataServices.uploadFile(data.image[0]) : null;

            if(file){ //The image was successfully uploaded
                 dataServices.deleteFile(post.featuredImage);
            }
              
            const updatePost = await dataServices.updatePost(post.$id,{
                ... data,
                featuredImage: file? file.$id : undefined
            })

            if(updatePost){
                alert("The post has been updated successfully!!!");
                navigate(`/post/${updatePost.$id}`);
            }
        }else{
            try {
                const file = await dataServices.uploadFile(data.image[0]);
                if (file && file.$id) {
                    const createPost = await dataServices.createPost({
                        ...data,
                        userId: userData.$id,
                        featuredImage: file.$id,
                    });

                    if (createPost) {
                         alert("The post has been created successfully!!!");
                        navigate(`/post/${createPost.$id}`);
                    }
                } else {
                    alert("Image upload failed. Check console for details.");
                }
            } catch (error) {
                alert("An error occurred");
                throw error;
            }
        }
    };

    const slugGenerator = useCallback((value) => {
        if(value && typeof(value)=='string'){
            return value?.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }else{
            return "";
        }

    },[]);

    useEffect(()=> {
        const subscription = watch((value, {name}) => {
            if(name == 'title'){
                setValue("slug",slugGenerator(value.title), {shouldValidate: true});
            }

        })
        return () => subscription.unsubscribe();
    },[watch, setValue, slugGenerator])


  return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap m-7">
            <div className="w-3/5 mx-auto text-white">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RealTimeEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2 text-white">
                <Input
                    label="Featured Image: "
                    type="file"
                    className="mb-4"
                    accept="image/jpg, image/png, image/jpeg, image/gif"
                    {...register("image", {required: !post})}
                   
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                options={["active", "inactive"]}
                label="Select: "
                className="mb-4"
                {...register("status",{required: true})}
                />
                <Button type="submit" bgColor={post ? "bg-green-500 hover:bg-green-700" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm
