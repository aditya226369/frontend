import { useNavigate } from "react-router-dom";
import {backendurl} from '../../Globals/constants';
import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import Container from "@material-ui/core/Container";
import classes from './Login.module.css';
import {
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Logo from "../../Img/black_white_logo.png";

const theme = createTheme();


export default function LoginPortal() {
  const [error,setError] = useState({
    flag:true,
    message:""
  });
  const [user,setUser] = useState({
    email:"",
    password:""
  })
  // const [error,setError] = useState(""); //shows error message if login failed
  let navigate = useNavigate();
  let name,value;
  const handleInputs=(e)=>{
    name = e.target.name;
    value = e.target.value;
    setUser({...user,[name]:value});
    
    
  }
  const validateEmail=(e)=>{
    e.preventDefault();
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!regex.test(user.email)){
      setError({
        flag:false,
        message:'You have entered an invalid email address!'
      })
    }else{
      setError({
        flag:true,
        message:''
      })
    }
  }

  

  function changeRoutes(){
    navigate("/dashboard");
  }

  const postData = async (e) => {
    e.preventDefault();
    const {email,password} = user;
    console.log(email);
    if(!email || !password){
      setError({flag:false,message:"Enter the required fields"});
    }else{
        if(error.flag === true){
        try{
          const res = await fetch("/login",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            credentials: "include",
            body:JSON.stringify({
              email,password
            })
          });
    
          const data = await res.json();
          if(data.status === 401 || !data){
            setError({flag:false,message:"Incorrect username or password"});
          }else if(data.status === 200){
            changeRoutes();
          }
          else{
            setError({flag:false,message:"Incorrect username or password"});
          }
        }catch(e){
          setError({flag:false,message:"Error occured please try after some time"});
        }
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
                  sx={{ mt: 3 }}
                ><form validate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        value={user.email}
                        onBlur={validateEmail}
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
                  <Grid hidden={error.flag} style={error.flag? {} : {textAlign:"center",width:'100%',color:'red'} }><span>{error.message}</span></Grid>
                  </Grid>
                  <Button
                    type="submit"
                    className={classes.submit_btn}
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    onClick={postData}
                  >
                    Log In
                  </Button>
                  <Grid className={classes.footer_link}>
                    <Link href="/register" variant="body2">
                      Don't have an account? Sign in
                    </Link>
                  </Grid>
                </form>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Card>
      </div>
    </>
  );
}
