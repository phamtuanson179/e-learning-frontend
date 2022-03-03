import React, { useState, useEffect } from "react"
// import isEmpty from "validator/lib/isEmpty"
import {useNavigate} from 'react-router-dom'
// import isEmail from "validator/lib/isEmail"
import axios from "api/axios"
import ENDPOINT from "api/loginAPI"
import APP_CONSTANTS from "constants/appConstants"
//import useMediaQuery from '@mui/material/useMediaQuery';


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

function SignInBasic(props) {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const history = useNavigate()    
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationMsg, setValidationMsg] = useState({})
  const [message, setMessage] = useState("")

  useEffect(() => {
    const token = localStorage.getItem(APP_CONSTANTS.USER_TOKEN)
    if (token) {
        history.replace('./get_exam')
    }
  })

  const onChangeEmail = (event) => {
    const value = event.target.value
    setEmail(value)
  }

  const onChangePassword = (event) => {
    const value = event.target.value
    setPassword(value)
  }

  // const validateAll = () => {
  //   const msg = {}
  //   if (isEmpty(email)) {
  //       msg.email = "Please input your Email"
  //   } else if (!isEmail(email)) {
  //       msg.email = "Your email is incorrect"
  //   }

  //   if (isEmpty(password)) {
  //       msg.password = "Please input your Password"
  //   }

  //   setValidationMsg(msg)
  //   if (Object.keys(msg).length > 0) return false
  //   return true
  // }

  const onSubmitLogin  = async () => {
    // const isValid = validateAll()
    // if (!isValid) return

    try {
        const data = {
            username: email,
            password: password
        }
        console.log({data})
        const url=ENDPOINT.LOGIN
        console.log({url})
          await axios.post(url, {data}).then((res)=> {
          if (res.data && res.data.messageCode === 1) {
            localStorage.setItem(APP_CONSTANTS.USER_TOKEN, res.data.result.access_token)
            setMessage("")
            history.replace('/get_exam')
        } else {
            setMessage(res.data.message)
        }
         })   
    } catch (error) {
        console.log("api login error: ", error)
    }
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
                  //color='white'
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
                      id='email'
                      placeholder='your email@.com'
                      autoComplete='email'
                      onChange={onChangeEmail}
                      fullWidth />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput 
                      type='password' 
                      label='Password' 
                      id='password'
                      placeholder='******'
                      onChange={onChangePassword}
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
                      // color='text'
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      Lưu mật khẩu
                    </MKTypography>
                  </MKBox>

                  <MKBox mt={4} mb={1}>
                    <MKButton 
                    variant='gradient' 
                    // color='info' 
                    onClick={onSubmitLogin}
                    fullWidth>
                      Đăng nhập
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign='center'>
                    <MKButton >
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
