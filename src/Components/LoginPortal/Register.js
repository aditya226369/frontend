import { useNavigate} from "react-router-dom";
import {url} from '../../Globals/constants';
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import Container from "@material-ui/core/Container";
import classes from './Register.module.css';
import {
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Logo from "../../Img/black_white_logo.png";

const theme = createTheme();


export default function Register() {
  // const [error,setError] = useState(""); //shows error message if login failed
  // console.log(url+"/login");
  const [error,setError] = useState({
    flag:true,
    message:""
  });
  const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
    cpassword:""
  });
  let navigate = useNavigate();

  function changeRoutes(){
    navigate("/login");
  }
  let name,value;
  const handleInputs=(e)=>{
    name = e.target.name;
    value = e.target.value;
    setUser({...user,[name]:value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };
  const postData = async (e) => {
    e.preventDefault();
    const {name,email,password,cpassword} = user;
    if(!name || !email || !password || !cpassword){
      setError({flag:false,message:"Enter the required fields"});
    }else if(password !== cpassword){
      setError({flag:false,message:"Password and Confirm password doesn't match"});
    }else{
      try{
        const res = await fetch({url}+"/register",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name,email,password,cpassword
          })
        });
  
        const data = await res.json();
        if(res.status === 422 || res.status === 500 || !data){
          setError({flag:false,message:"Error occured please try after some time"});
        }else if(res.status === 200){
          changeRoutes()
        }else if(res.status === 423){
          setError({flag:false,message:"User already exists"});
        }
        else{
          setError({flag:false,message:"Error occured please try after some time"});
        }
      }catch(e){
        setError({flag:false,message:"Error occured please try after some time"});
      }
    }
    
  };

  return (
    <>
      <div className={classes.login_main}>
        <div className={classes.div_logo}>
          <img src={Logo} className={classes.logo} alt="logo" />
        </div>
        <Card className={classes.card}>
          <ThemeProvider theme={theme}>
            <Container
              component="main"
              maxWidth="xs"
              style={{ textAlign: "center" }}
            >
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <PersonRoundedIcon color="primary" className={classes.icon} />
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        type="text"
                        id="Name"
                        label="Name"
                        value={user.name}
                        onChange={handleInputs}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        type="email"
                        label="Email Address"
                        name="email"
                        value={user.email}
                        onChange={handleInputs}
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={handleInputs}        
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmpassword"
                        value={user.cpassword}
                        onChange={handleInputs}
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid hidden={error.flag} style={error.flag? {} : {textAlign:"center",width:'100%',color:'red'} }><span>{error.message}</span></Grid>
                  </Grid>
                  <Button
                    type="submit"
                    className={classes.submit_btn}
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    onClick={postData}
                  >
                    Sign Up
                  </Button>
                  <Grid className={classes.footer_link}>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Card>
      </div>
    </>
  );
}
