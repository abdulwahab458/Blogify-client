import React from 'react'
import { data, NavLink, useParams } from 'react-router-dom'
import Postmenuaction from '../components/Postmenuaction'
import Search from '../components/Search'
import Comments from '../components/Comments'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { format } from 'timeago.js'

const fetchdata = async(slug)=>{
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  console.log(res.data)
  return res.data;
}

const Singlepostpage = () => {
  const {slug} = useParams()
  const {isPending,error,data} = useQuery({
    queryKey:['post',slug],
    queryFn:()=>fetchdata(slug)
  });
  if(isPending) return "loading...";
  if(error) return "unexpected error";
  if(!data) return "Post not found"
  return (
    <div className='flex flex-col gap-8'>
      {/* detail  */}
      <div className="flex gap-8">
      <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-2xl xl:text-3xl 2xl:text-5xl font-semibold mt-5">
           {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <NavLink className="text-[#900a87]">{data.user.username}</NavLink>
            <span>on</span>
            <NavLink className="text-[#900a87]">{data.category}</NavLink>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">
            {data.desc}
          </p>
        </div>
          {data.img&&<div className="hidden lg:block w-2/5 ">
            <img src={data.img} alt="" className='w-[600px] mt-9'/>
          </div>}
      </div>
      {/* content  */}
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        {/* text   */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify" dangerouslySetInnerHTML={{ __html: data.content }}></div>


        {/* menu  */}
        <div className="px-4 h-max sticky top-8">
        <h1 className="mb-4 text-sm font-medium">Author</h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-8">
            {data.user.img&&<img src={data.user.img} alt=""   className="w-12 h-12 rounded-full object-cover"/>}
            <NavLink className="text-[#900a87]">{data.user.username}</NavLink>
          </div>
            
        </div>
        {/* menu actions  */}
        <Postmenuaction post={data}/>
        {/* CATEGORIES  */}
        <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <NavLink className="underline">All</NavLink>
            <NavLink className="underline" to="/">
              Web Design
            </NavLink>
            <NavLink className="underline" to="/">
              Development
            </NavLink>
            <NavLink className="underline" to="/">
              Databases
            </NavLink>
            <NavLink className="underline" to="/">
              Search Engines
            </NavLink>
            <NavLink className="underline" to="/">
              Marketing
            </NavLink>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search/>
        </div>
      </div>
      {/* <Comments postId={data._id}/> */}
    </div>
  )
}

export default Singlepostpage
