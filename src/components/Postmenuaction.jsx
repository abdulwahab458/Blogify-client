import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Postmenuaction = ({ post }) => {
    const { user } = useUser()
    const { getToken } = useAuth()
    const navigate = useNavigate()
    const { isPending, error, data: savedPosts } = useQuery({
        queryKey: ['savedPosts'],
        queryFn: async () => {
            const token = await getToken()
            return await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
        }
    });
    const isAdmin = user?.publicMetadata?.role === "admin" || false;
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        setIsSaved(savedPosts?.data?.some((p) => p === post._id) || false);
    }, [savedPosts, post._id]);

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken()
            return await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
        },
        onSuccess: () => {
            toast.success("Post deleted successfully")
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.response.data);
        },
    })
    const queryClient = useQueryClient()
    const saveMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return await axios.patch(`${import.meta.env.VITE_API_URL}/users/save`, {
                postId: post._id,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        },
        onSuccess: () => {
            queryClient.setQueryData(['savedPosts'], (oldData) => {
                if (!oldData) return [post._id];
                return [...oldData, post._id];
            });
            toast.success("Post saved!");
        },
        onError: (error) => {
            toast.error(error.response.data);
        },
    });
    const featureMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return await axios.patch(`${import.meta.env.VITE_API_URL}/posts/feature`, {
                postId: post._id,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["post",post.slug]})
        },
        onError: (error) => {
            toast.error(error.response.data);
        },
    });
    const handlefeature = ()=>{
        featureMutation.mutate();
    }

    const handleDelete = () => {
        deleteMutation.mutate();
    }
    const handlesave = () => {
        if (!user) {
            return navigate('/login')
        }
        saveMutation.mutate();
    }
    return (
        <div>
            {user && (post.user.username === user.username || isAdmin) && <h1 className='mt-8 mb-4 text-lg font-bold '>Actions</h1>}
            {user && (post.user.username === user.username) &&

                <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handlesave}>

                    <svg
                        className="h-[30px] w-[30px] cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        onClick={handlesave}
                    >
                        <path
                            fill={isSaved ? "black" : "blue"}
                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                        />
                    </svg>

                    <span>{isSaved ? "Saved" : "Save this post "}  </span>

                </div>}

            {isAdmin && ( 
                <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handlefeature}>
                    <svg
                        className="h-[30px] w-[30px] cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path
                            fill={post.isFeatured ? "#FFD700" : "white"}
                            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                        />
                    </svg>
                    <span>Feature</span>
                </div>
            )}
            {user && (post.user.username === user.username || isAdmin) && (<div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleDelete}>
                <img src="/delete.svg" alt="" className='h-[30px] w-[30px]' />
                <span className='text-[tomato]'>Delete this post </span>
            </div>
            )}
        </div>
    )
}

export default Postmenuaction
