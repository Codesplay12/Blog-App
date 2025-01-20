import React, { useState } from "react";
import { Box, 
  AppBar,
   Toolbar,
    Button,
     Typography ,Tabs,Tab} from "@mui/material";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-hot-toast';


const Header = () => {
  //global state
let isLogin = useSelector(state=> state.isLogin)

isLogin = isLogin || localStorage.getItem("userId");


  //state
  const [value, setValue] = useState();

  const dispatch = useDispatch()

  const navigate = useNavigate();


  const handleLogout = () =>
  {
    try {
      dispatch(authActions.logout());
      toast.success("Logout SuccessFully");
      navigate('/login')
      localStorage.clear();
    } catch (error) {
      console.log(error);
      
    }
  }
  

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">Blogify</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"} >
            <Tabs textColor="inherit" value={value} onChange={(e,val)=> 
              setValue(val)
            }>
              <Tab label="Blogs" LinkComponent={Link} to ="/blogs"/>
              <Tab label=" My Blogs" LinkComponent={Link} to ="/my-blogs"/>
              <Tab label=" Create Blog" LinkComponent={Link} to ="/create-blog"/>



            </Tabs>
                
          </Box>
          )}
          
          <Box display={"flex"} marginLeft="auto">
          {!isLogin && (<>
            <Button
              sx={{ margin: 1, color: "white" }}
              LinkComponent={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              sx={{ margin: 1, color: "white" }}
              LinkComponent={Link}
              to="/register"
            >
              Register
            </Button>

          </>)}
          {isLogin && (
           <Button onClick={handleLogout } sx={{ margin: 1, color: "white" }}>Logout</Button>

          )}
          
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
