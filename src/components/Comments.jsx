import React from 'react'
import Comment from './Comment'
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

const fetchcomments = async(postId)=>{
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
  return res.data.comments || [];
}

const Comments = ({postId}) => {
  const {getToken} = useAuth();
  const {isPending,error,data} = useQuery({
    queryKey:['comments',postId],
    queryFn:()=>fetchcomments (postId)
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn: async(newComment) => {
        const token = await getToken();
        console.log(token)
        return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment,{
          headers:{
            Authorization:`Bearer ${token}`,
          },
        });
      },
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['comments',postId]})
      },
      onError: (err) => {
        const errorMessage = err?.response?.data?.message || "Something went wrong!";
        console.log(errorMessage)
        toast.error(errorMessage);
      }
      
    });
  if(isPending) return "loading...";
  if(error) return "unexpected error";

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
      desc: formData.get("desc"), 
      post: postId, 
    };
  
    console.log("Sending data:", data); 
  
    mutation.mutate(data);
  };
  return (
    <div className='flex flex-col gap-8 lg:w-3/5 mb-12'>
        <h1 className="text-xl text-gray-500 underline">Comments</h1>
        <form onSubmit={handlesubmit}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          name="desc"
          placeholder="Write a comment..."
          className="w-full p-4 rounded-xl bg-white resize-none"
        />
        <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">
          Send
        </button>
      </form>
      {Array.isArray(data) && data.map((comment) => (
  <Comment key={comment._id} comment={comment} />
))}
     
    </div>
  )
}

export default Comments
