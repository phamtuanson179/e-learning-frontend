import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import loginAPI from "api/loginAPI";
import infoAPI from 'api/infoAPI'
import { UserContext } from "App";
// Images
import bgImage from "assets/images/techpro-images/backgroundSignIn.jpeg";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { string } from "prop-types";
import { Typography } from "antd";
import { checkLogin } from "../../utils/checkLogin";
import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";

const yupSchema = yup.object().shape({
    email: yup.string().required('Trường này bắt buộc!').email('Chưa đúng định dạng!'),
    password: yup.string().required('Trường này bắt buộc!'),
})

function SignIn() {
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(yupSchema) })

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPass, setIsShowPass] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [notification, setNotification] = useState({ type: '', message: '' });
    const [openNoti, setOpenNoti] = useState(false)


    const onChangeEmail = (event) => {
        const value = event.target.value;
        setEmail(value);
    };

    const onChangePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
    };

    const showPass = () => {
        setIsShowPass(!isShowPass);
    }

    const onSubmitLogin = async () => {

        try {
            const data = {
                email: email,
                password: password,
            };
            console.log({ data })

            await loginAPI.login(data).then((res) => {
                console.log({ res })
                localStorage.setItem("accessToken", res?.data.access_token);
                localStorage.setItem("email", data.email);

                // setUser({ loggedIn: true })
                // if (location.state?.from) {
                //     navigate(location.state.from);
                // } else (navigate('/list-exams'))
            });
            await infoAPI.getInfo().then((res) => {
                if (res?.status === 200) {
                    setNotification({
                        message: 'Đăng nhập thành công!',
                        type: NOTIFICATION.SUCCESS
                    })
                    setOpenNoti(true)
                    const data = res?.data
                    localStorage.setItem('userId', data?.user_id)
                    localStorage.setItem('role', data?.role)
                    setTimeout(() => navigate('/list-exams'), 2000)

                } else {
                    setNotification({
                        message: 'Đăng nhập thất bại',
                        type: NOTIFICATION.ERROR
                    })
                    setOpenNoti(true)
                }
            })




        } catch (error) {
            console.log(error);
        }
    };

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
                            {/* <form onSubmit={handleSubmit(onSubmitLogin)} method='post'> */}
                            <MKBox pt={4} pb={3} px={3}>
                                <MKBox component='form' role='form'>
                                    <MKBox mb={2}>
                                        {/* <Controller
                        name="email"
                        control={control}
                        render={(({ field }) => {
                          return (
                            <MKInput
                              type='email'
                              label='Email'
                              id='email'
                              placeholder='your email@.com'
                              autoComplete='email'
                              onChange={onChangeEmail}
                              fullWidth
                              {...field}
                            />
                          )
                        })}
                      /> */}

                                        <MKInput
                                            type='email'
                                            label='Email'
                                            id='email'
                                            placeholder='your email@.com'
                                            autoComplete='email'
                                            onChange={onChangeEmail}
                                            fullWidth
                                        // {...field}
                                        />
                                        {/* <Typography variant='subtitle2' color='warning'>{errors.email?.message}</Typography> */}
                                    </MKBox>
                                    <MKBox display='flex' alignItems='center' sx={{ position: 'relative' }} mb={2}>

                                        {/* <Controller
                        name="password"
                        control={control}
                        render={(({ field }) => {
                          return (
                            <MKInput
                              type={isShowPass ? "text" : "password"}
                              label='Password'
                              id='password'
                              placeholder='******'
                              onChange={onChangePassword}
                              fullWidth
                              {...field}
                            />
                          )
                        })}
                      /> */}

                                        <MKInput
                                            type={isShowPass ? "text" : "password"}
                                            label='Password'
                                            id='password'
                                            placeholder='******'
                                            onChange={onChangePassword}
                                            fullWidth
                                        // {...field}
                                        />


                                        {isShowPass ?
                                            <VisibilityOffIcon sx={{ position: 'absolute', right: 8 }} onClick={showPass} /> :
                                            <VisibilityIcon sx={{ position: 'absolute', right: 8 }} onClick={showPass} />}
                                    </MKBox>

                                    <MKBox mt={4} mb={1}>
                                        <MKButton
                                            variant='gradient'
                                            color='info'
                                            fullWidth
                                            // type='submit'
                                            onClick={onSubmitLogin}
                                        >
                                            Đăng nhập
                                        </MKButton>
                                    </MKBox>
                                    <MKBox mt={3} mb={1} textAlign='center'>
                                        <MKButton>Bạn quên mật khẩu?</MKButton>
                                    </MKBox>
                                </MKBox>
                            </MKBox>
                            {/* </form> */}
                        </Card>
                    </Grid>
                </Grid>
            </MKBox>
            <TPNotification type={notification.type} message={notification.message} open={openNoti
            } setOpen={setOpenNoti} />
        </>
    );
}

export default SignIn;
