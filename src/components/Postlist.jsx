import React, { useState } from 'react';
import Postlistitem from './Postlistitem';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

const fetchPosts = async (pageParam,searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams])
  console.log(searchParamsObj)
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10,...searchParamsObj },
  });
  return res.data;
};

const Postlist = () => {
  const [searchParams, setsearchParams] = useSearchParams()
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts',searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam,searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      console.log('Last Page:', lastPage);
      console.log('Pages Length:', pages.length);

      
      if (!lastPage.hasMore) {
        return undefined;  
      }

      
      return pages.length + 1;
    },
  });

  if (status === 'loading') return 'Loading...';

  if (status === 'error') return 'Error occurred';

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <div className="flex flex-col gap-12 mb-8">
      <InfiniteScroll
        dataLength={allPosts.length} 
        next={fetchNextPage} 
        hasMore={hasNextPage} 
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>All Posts Loaded</b>
          </p>
        }
      >
        {allPosts.map((post) => {
          return <Postlistitem key={post._id} post={post} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Postlist;
