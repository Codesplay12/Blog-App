import React,{useState} from 'react'
import {Box,InputLabel,TextField,Typography,Button} from "@mui/material"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {  toast } from 'react-hot-toast';


const CreateBlog = () => {

    const id = localStorage.getItem('userId');

    const navigate = useNavigate();

    const [input,setInput]= useState({
        title: "",
        description: "",
        image: "",
});

//input change
const handleChange = (e) =>
{
setInput(prevState =>
({...prevState,
    [e.target.name]: e.target.value
})
)
}

    const handleSubmit = async(e)=>
    {
       e.preventDefault();
       try {
        const {data} = await axios.post('http://localhost:8080/api/v1/blog/create-blog',{
            title:input.title,
            description:input.description,
            image:input.image,
            user: id,
        })
        if(data?.success)
        {
            toast.success("blog created");
            navigate('/my-blogs');
        }
       } catch (error) {
        console.log(error);
        
       }
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
  <Box
    width={"60%"}
    border={3}
    borderColor={"#1976d2"}
    borderRadius={12}
    padding={4}
    margin="auto"
    boxShadow={"10px 10px 30px rgba(0, 0, 0, 0.3)"}
    display="flex"
    flexDirection={"column"}
    marginTop="40px"
    bgcolor="#f5f5f5"
  >
    <Typography
      variant="h3"
      textAlign={"center"}
      fontWeight="bold"
      padding={2}
      color="#333"
      sx={{ textShadow: "1px 1px 2px #aaa" }}
    >
      Create A Post
    </Typography>

    <InputLabel
      sx={{ mb: 1, mt: 3, fontSize: "20px", fontWeight: "bold", color: "#1976d2" }}
    >
      Title
    </InputLabel>
    <TextField
      name="title"
      value={input.title}
      onChange={handleChange}
      margin="normal"
      variant="outlined"
      required
      sx={{ bgcolor: "#fff", borderRadius: 2 }}
    />

    <InputLabel
      sx={{ mb: 1, mt: 3, fontSize: "20px", fontWeight: "bold", color: "#1976d2" }}
    >
      Description
    </InputLabel>
    <TextField
      name="description"
      value={input.description}
      onChange={handleChange}
      margin="normal"
      variant="outlined"
      required
      multiline
      rows={4}
      sx={{ bgcolor: "#fff", borderRadius: 2 }}
    />

    <InputLabel
      sx={{ mb: 1, mt: 3, fontSize: "20px", fontWeight: "bold", color: "#1976d2" }}
    >
      Image URL
    </InputLabel>
    <TextField
      name="image"
      value={input.image}
      onChange={handleChange}
      margin="normal"
      variant="outlined"
      required
      sx={{ bgcolor: "#fff", borderRadius: 2 }}
    />

    <Button
      type="submit"
      color="primary"
      variant="contained"
      sx={{ mt: 4, padding: "10px 20px", fontSize: "18px", fontWeight: "bold" }}
    >
      SUBMIT
    </Button>
  </Box>
</form>

    </>
  )
}

export default CreateBlog
