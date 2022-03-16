import { Schema, Settings } from "@mui/icons-material";
import { Box, Button, Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import infoAPI from "api/infoAPI";
import { useEffect, useState } from "react";
import ModalUpdatePersonalInfo from "./UpdatePersonalInfoModal";
import './PersonalInfo.scss'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const yupSchema = yup.object().shape({
    fullname: yup.string().required('Trường này bắt buộc!'),
    email: yup.string().required('Trường này bắt buộc!').email('Chưa đúng định dạng!'),
})

const PersonalInfo = () => {
    const [personalInfo, setPersonalInfo] = useState('');
    const [showModalUpdatePersonalInfo, setShowModalUpdatePersonalInfo] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const { control, handleSubmit, formState: {
        errors
    } } = useForm({ resolver: yupResolver(yupSchema) });

    const onSubmit = async (data) => {
        console.log({data})
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
        await infoAPI.putUpdateUser(newData).then(() => {
            setPersonalInfo(newData)
            setShowModalUpdatePersonalInfo(false)
        })
    }

    // const handleChange = info => {
    //     console.log({ info })
    //     if (info.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         getBase64(info.file.originFileObj, imageUrl => {
    //             console.log({ imageUrl })
    //             setImageUrl(imageUrl)
    //         }
    //         );
    //     }
    // };

    const getPersonalInfo = async () => {
        await infoAPI.getInfo().then((res) => {
            setPersonalInfo(res?.data)
        })
    }

    useEffect(() => {
        getPersonalInfo()
    }, [])


    const onShowModal = () => {
        setShowModalUpdatePersonalInfo(true)
    }

    // const [age, setAge] = React.useState('');

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };
    return ( personalInfo ?
        <Box className="personal-info__container">
            <Box className="title__box" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h5' component={'div'}>Thông tin cá nhân</Typography>
                <Button onClick={onShowModal}><Settings></Settings></Button>
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
                                render={({ field }) => {
                                    return (<TextField
                                        sx={{
                                            width: '100%',
                                        }}
                                        {...field}
                                        label="Họ và tên"
                                        variant="outlined"
                                        defaultValue={personalInfo?.fullname}
                                    />)
                                }}
                            />
                            <Typography variant='body2' >{errors.fullname?.message}</Typography>
                        </Grid>

                        <Grid item xs={6} className='dob'>
                            < TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                sx={{
                                    width: '100%',
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={personalInfo?.date_of_birth}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6} className='email'>
                            <TextField sx={{
                                width: '100%',
                            }} label="Email" variant="outlined" defaultValue={personalInfo?.email} />
                        </Grid>
                        <Grid item xs={6} className='position'>
                            <TextField sx={{
                                width: '100%',
                            }} label="Vị trí" variant="outlined" defaultValue={personalInfo?.position} />
                        </Grid>
                        <Grid item xs={6} className='role'>
                            <TextField sx={{
                                width: '100%',
                            }} label="Quyền" variant="outlined" defaultValue={personalInfo?.role}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6} className='room'>
                            <TextField sx={{
                                width: '100%',
                            }} label="Phòng" variant="outlined" defaultValue={personalInfo?.room} />
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
            </form>
           
            <ModalUpdatePersonalInfo
                setShowModalUpdatePersonalInfo={setShowModalUpdatePersonalInfo}
                showModalUpdatePersonalInfo={showModalUpdatePersonalInfo}
                personalInfo={personalInfo}
                setPersonalInfo={setPersonalInfo}
            />
        </Box> : <></>
    );
}

export default PersonalInfo;