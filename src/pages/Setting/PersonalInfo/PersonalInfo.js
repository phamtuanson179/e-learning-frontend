import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import infoAPI from "api/infoAPI";
import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";
import { useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import './PersonalInfo.scss';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


const yupSchema = yup.object().shape({
    fullname: yup.string().required('Trường này bắt buộc!'),
    email: yup.string().required('Trường này bắt buộc!').email('Chưa đúng định dạng!'),
})

const PersonalInfo = () => {
    const [personalInfo, setPersonalInfo] = useState('');
    const [notification, setNotification] = useState({ type: '', message: '' });
    const [openNoti, setOpenNoti] = useState(false)

    const { control, handleSubmit, formState: {
        errors
    } } = useForm({ resolver: yupResolver(yupSchema) });


    const onSubmit = async (data) => {
        console.log({ data })
        const convertData = (data) => {
            return {
                ...data,
                password: null,
                token: null,
                url_avatar: "",
                user_id: personalInfo?.user_id
            }
        }
        const newData = convertData(data)
        await infoAPI.putUpdateUser(newData).then((res) => {
            console.log({ res })
            if (res?.status == 200) {
                setNotification({
                    message: 'Thay đổi thông tin thành công!',
                    type: NOTIFICATION.SUCCESS
                })
                setOpenNoti(true)
            }
            else {
                setNotification({
                    message: 'Thay đổi thông tin thất bại',
                    type: NOTIFICATION.ERROR
                })
                setOpenNoti(true)

            }
            setPersonalInfo(newData)
        })
    }


    const getPersonalInfo = async () => {
        await infoAPI.getInfo().then((res) => {
            console.log({ res })
            setPersonalInfo(res?.data)
        })
    }

    useEffect(() => {
        getPersonalInfo()
    }, [])





    return (personalInfo ?
        <Box className="personal-info__container">
            <Box className="title__box" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h5' component={'div'}>Thông tin cá nhân</Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: 1.5 }}>
                    <Grid
                        className='detail-personal-info__box'
                        container
                        sx={{
                            marginTop: 2,
                            marginBottom: 2,
                            marginLeft: -2,
                            width: '100%',
                        }}
                        spacing={2}
                        rowSpacing={3}
                    >

                        <Grid item xs={6} className='name'>
                            <Controller
                                name='fullname'
                                control={control}
                                defaultValue={personalInfo?.fullname}
                                render={({ field }) => {
                                    return (<TextField
                                        sx={{
                                            width: '100%',
                                        }}
                                        helperText={<Typography variant='caption' color='error'> {errors.fullname?.message}</Typography>
                                        }
                                        {...field}
                                        label="Họ và tên"
                                        variant="outlined"
                                    />)
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} className='dob'>
                            <Controller
                                name='date_of_birth'
                                control={control}
                                defaultValue={personalInfo?.date_of_birth}
                                render={({ field }) => {
                                    return (< TextField
                                        id="date"
                                        label="Birthday"
                                        type="date"
                                        helperText={<Typography variant='caption' color='error'> {errors.date_of_birth?.message}</Typography>
                                        }

                                        sx={{
                                            width: '100%',
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...field}

                                    />)
                                }}
                            />

                        </Grid>
                        <Grid item xs={6} className='email'>
                            <Controller
                                name='email'
                                control={control}
                                defaultValue={personalInfo?.email}

                                render={({ field }) => {
                                    return (< TextField
                                        sx={{
                                            width: '100%',
                                        }}
                                        helperText={<Typography variant='caption' color='error'> {errors.email?.message}</Typography>
                                        }

                                        {...field}
                                        label="Email" variant="outlined" />)
                                }}
                            />

                        </Grid>
                        <Grid item xs={6} className='position'>
                            <Controller
                                name='position'
                                control={control}
                                defaultValue={personalInfo?.position}
                                render={({ field }) => {
                                    return (<TextField
                                        sx={{
                                            width: '100%',
                                        }}
                                        label="Vị trí"
                                        variant="outlined"
                                        {...field}
                                    />)
                                }}
                            />

                        </Grid>
                        <Grid item xs={6} className='role'>
                            <Controller
                                name='role'
                                control={control}
                                defaultValue={personalInfo?.role}
                                render={({ field }) => {
                                    return (
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="ewrqewrqwerqew"
                                                sx={{ height: 44 }}
                                                {...field}
                                            >
                                                <MenuItem value={0}>Superadmin</MenuItem>
                                                <MenuItem value={1}>Admin</MenuItem>
                                                <MenuItem value={2}>Member</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} className='room'>
                            <Controller
                                name='room'
                                control={control}
                                defaultValue={personalInfo?.room}
                                render={({ field }) => {
                                    return (<TextField
                                        sx={{
                                            width: '100%',
                                        }}
                                        label="Phòng"
                                        variant="outlined"
                                        {...field}
                                    />)
                                }}
                            />

                        </Grid>
                    </Grid>
                </Box>
                <Button
                    className='confirm__button'
                    sx={{ marginLeft: 'auto', display: 'flex', marginRight: 2, marginBottom: 4, }}
                    type='submit'
                >
                    Lưu thay đổi
                </Button>
            </form >
            <TPNotification type={notification.type} message={notification.message} open={openNoti
            } setOpen={setOpenNoti} />
        </Box > : <CircularProgress />
    );
}

export default PersonalInfo;