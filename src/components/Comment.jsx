import React from 'react'

const Comment = () => {
  return (
    <div>
       <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
      <img src="/featured3.jpeg" alt=""   className="w-12 h-12 rounded-full object-cover"/>     
        <span className="font-medium">Abdul Wahab</span>
        <span className="text-sm text-gray-500">
          2 days  ago
        </span>
        
      </div>
      <div className="mt-4">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, ullam distinctio dolore corporis laboriosam adipisci debitis reiciendis accusantium, rerum culpa sunt. Quae porro vitae delectus impedit nulla sunt ipsa ab!</p>
      </div>
    </div>
    </div>
  )
}

export default Comment
