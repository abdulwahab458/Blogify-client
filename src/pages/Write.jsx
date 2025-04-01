import { SignIn, useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Upload from '../components/upload';

// Custom CSS for ReactQuill dark theme
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ]
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'color', 'background',
  'link', 'image', 'video'
];

const customStyles = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: 'white',
  border: 'none'
};

const Writepage = () => {
  const [value, setValue] = useState('');
  const { isLoaded, isSignedIn } = useUser();
  const [cover, setCover] = useState("")
  const [image, setImage] = useState("")
  const [video, setVideo] = useState("")
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    image && setValue(prev => prev + `<p><img src="${image.url}" classname=""/></p>`)
  }, [image])

  useEffect(() => {
    video && setVideo(prev => prev + `<p><iframe src="${video.url}" classname="ql-video"/></p>`)
  }, [video])

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post created successfully")
      navigate(`/${res.data.slug}`);
    }
  });

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#32012F]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (isLoaded && !isSignedIn) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-[#32012F] to-[#4A0245]">
        <div className="text-2xl font-semibold text-white mb-4">Please Login First</div>
        <button 
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-white text-[#32012F] rounded-lg shadow-lg hover:bg-gray-100 transition-all"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      img: `https://ik.imagekit.io/ayilxtoo3${cover.filePath}` || '',
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value
    }
    mutation.mutate(data);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#32012F] to-[#4A0245]">
      <style>
        {`
          .ql-toolbar.ql-snow {
            background: rgba(255, 255, 255, 0.1) !important;
            border-color: rgba(255, 255, 255, 0.2) !important;
            border-top-left-radius: 0.75rem;
            border-top-right-radius: 0.75rem;
          }
          
          .ql-container.ql-snow {
            background: rgba(255, 255, 255, 0.05) !important;
            border-color: rgba(255, 255, 255, 0.2) !important;
            border-bottom-left-radius: 0.75rem;
            border-bottom-right-radius: 0.75rem;
            min-height: 200px;
          }

          .ql-toolbar .ql-stroke {
            stroke: rgba(255, 255, 255, 0.8) !important;
          }

          .ql-toolbar .ql-fill {
            fill: rgba(255, 255, 255, 0.8) !important;
          }

          .ql-toolbar .ql-picker {
            color: rgba(255, 255, 255, 0.8) !important;
          }

          .ql-toolbar .ql-picker-options {
            background-color: #32012F !important;
            border-color: rgba(255, 255, 255, 0.2) !important;
          }

          .ql-snow .ql-picker.ql-expanded .ql-picker-options {
            border-color: rgba(255, 255, 255, 0.2) !important;
          }

          .ql-editor {
            color: white !important;
          }

          .ql-editor.ql-blank::before {
            color: rgba(255, 255, 255, 0.5) !important;
          }

          .ql-snow .ql-picker-item:hover, 
          .ql-snow .ql-picker-item.ql-selected {
            color: white !important;
          }

          .ql-toolbar button:hover .ql-stroke,
          .ql-toolbar button.ql-active .ql-stroke {
            stroke: white !important;
          }

          .ql-toolbar button:hover .ql-fill,
          .ql-toolbar button.ql-active .ql-fill {
            fill: white !important;
          }
        `}
      </style>

      <div className="container mx-auto p-6 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">
          Create Your Story
          <div className="h-1 w-24 bg-white/50 mx-auto mt-2 rounded-full"></div>
        </h1>

        <form onSubmit={handlesubmit} className="space-y-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="relative group">
            <Upload type="image" setData={setCover}>
              <button className="w-full h-48 border-2 border-dashed border-white/30 rounded-xl hover:border-white/50 transition-all duration-300 flex flex-col items-center justify-center bg-white/5 group-hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/70 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-white/90 font-medium">Add Cover Image</span>
                <span className="text-sm text-white/60 mt-1">Click or drag and drop</span>
              </button>
            </Upload>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Your Story Title"
              name='title'
              className="w-full p-4 border-b-2 border-white/20 bg-transparent rounded-t-lg focus:outline-none focus:border-white/50 text-3xl font-medium transition-all duration-300 text-white placeholder-white/50"
            />
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <label className="text-sm font-medium text-white/80">Category:</label>
            <select
              name="category"
              className="p-2 rounded-lg bg-[#32012F] border border-white/20 focus:outline-none focus:border-white/50 transition-all duration-300 text-white"
            >
              <option value="general">General</option>
              <option value="web design">Web Design</option>
              <option value="development">Development</option>
              <option value="seo">Search Engine</option>
              <option value="database">Database</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="relative">
            <textarea
              name="desc"
              placeholder="Write a compelling description..."
              className="w-full p-4 border border-white/20 bg-white/5 rounded-xl focus:outline-none focus:border-white/50 transition-all duration-300 resize-none h-32 text-white placeholder-white/50"
            ></textarea>
          </div>

          <div className="bg-white/5 rounded-xl shadow-sm border border-white/20">
            <div className="flex gap-2 p-2 border-b border-white/10">
              <Upload type="video" setData={setVideo}>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <span className="text-2xl">📽️</span>
                </button>
              </Upload>
              <Upload type="image" setData={setImage}>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <span className="text-2xl">🖼️</span>
                </button>
              </Upload>
            </div>
            <ReactQuill 
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              className="rounded-b-xl h-[400px] font-white" 
              value={value} 
              onChange={setValue}
              style={customStyles}
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={mutation.isPending}
              className="px-8 py-3 bg-white text-[#32012F] rounded-xl hover:bg-gray-100 disabled:bg-white/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg font-semibold"
            >
              {mutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#32012F]"></div>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Publish Story</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Writepage;