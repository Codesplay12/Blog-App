import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import {useNavigate} from "react-router-dom"

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';





export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser
}) {

  const navigate = useNavigate()
  const handleEdit = () =>
  {
    toast.success("Blog updated")
    navigate(`/blog-details/${id}`);
  }

  const handleDelete = async() =>{
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${id}`)
      if(data?.success)
      {
        toast.success("blog deleted")
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  

  return (
    <Card sx={{ width:'40%', margin:'auto', mt:2,padding:2,boxShadow:'5px 5px 10px #ccc', ":hover:":{
        boxShadow:'10px 10px 20px #ccc'
    } }}>
      {isUser && (
        <Box display={'flex'}>
          <IconButton onClick={handleEdit}>
            <ModeEditIcon color='info'/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color='error'/>
          </IconButton>
           
        </Box>
      )} 
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
       
        title={username}
        subheader={time}
       
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Title: {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Description: {description}
        </Typography>
      </CardContent>
      
     
    </Card>
  );
}