import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'

// react-router-dom components
//import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
//import MuiLink from "@mui/material/Link";

// // @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import axios from "./api/loginApi.js";
// import AuthContext from "/AuthContext.js";
// const LOGIN_URL='http://0.0.0.0:8000/login  ';

const SignInBasic = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  useEffect(()=> {
    if (localStorage.getItem('user-info')){
      history.push("/add")
    }
  },[])
  async function Login () {
    console.warn(email, password)
    let item = (email, password);
    let result = await fetch("http://0.0.0.0:8000/login",{
      method: 'POST',
      headers:{
        "content-type":"application/json",
        "accept":"application/json"
      },
      body: JSON.stringify(item)
    });
    result = await result.json();
    localStorage.setItem(JSON.stringify(result))
    history.push('./add')

  }
 
  return (
    <>
      <MKBox
        position='absolute'
        top={0}
        left={0}
        zIndex={1}
        width='100%'
        minHeight='100vh'
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox
        px={1}
        width='100%'
        height='100vh'
        mx='auto'
        position='relative'
        zIndex={2}
      >
        <Grid
          container
          spacing={1}
          justifyContent='center'
          alignItems='center'
          height='100%'
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant='gradient'
                bgColor='info'
                borderRadius='lg'
                coloredShadow='info'
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign='center'
              >
                <MKTypography
                  variant='h4'
                  fontWeight='medium'
                  color='white'
                  mt={1}
                >
                  Đăng nhập
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component='form' role='form'>
                  <MKBox mb={2}>
                    <MKInput 
                      type='email' 
                      label='Email' 
                      onChange={(e)=>setEmail(e.target.value)}
                      fullWidth />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput 
                      type='password' 
                      label='Password' 
                      onChange={(e)=>setPassword(e.target.value)}
                      fullWidth />
                  </MKBox>

                  <MKBox display='flex' alignItems='center' ml={-1}>
                    <Switch
                      checked={rememberMe}
                      onChange={handleSetRememberMe}
                    />
                    <MKTypography
                      variant='button'
                      fontWeight='regular'
                      color='text'
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      Lưu mật khẩu
                    </MKTypography>
                  </MKBox>

                  <MKBox mt={4} mb={1}>
                    <MKButton 
                    variant='gradient' 
                    color='info' 
                    onClick={Login}
                    fullWidth>
                      Đăng nhập
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign='center'>
                    <MKButton variant='button' color='text'>
                      Bạn quên mật khẩu?
                    </MKButton> 
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default SignInBasic;
