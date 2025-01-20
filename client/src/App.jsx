import React from 'react';
import Header from './components/Header'
import {Routes,Route} from 'react-router-dom'
import Blog from './Pages/Blog'
import Login from './Pages/Login'
import Register from './Pages/Register'
import UserBlogs from './Pages/UserBlogs';
import CreateBlog from './Pages/CreateBlog';
import BlogDetails from './Pages/BlogDetails';
import {  Toaster } from 'react-hot-toast';


const App = () => {
  return (
     <>
     <Header />
     <Toaster />
      <Routes>
    
       <Route path="/" element={<Blog/>} />
       <Route path="/blogs" element={<Blog/>} />
       <Route path="/my-blogs" element={<UserBlogs/>} />
       <Route path="/blog-details/:id" element={<BlogDetails/>} />

       <Route path="/create-blog" element={<CreateBlog/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register/>} />
     </Routes>
       
     </>
    
    
  )
}

export default App

