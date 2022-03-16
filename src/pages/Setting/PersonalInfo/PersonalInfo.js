import { Schema, Settings } from "@mui/icons-material";
import { Box, Button, Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import infoAPI from "api/infoAPI";
import { useEffect, useState } from "react";
import ModalUpdatePersonalInfo from "./UpdatePersonalInfoModal";
import './PersonalInfo.scss'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

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
    } } = useForm({ resolver: yupResolver(yupSchema) })

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
    return (personalInfo ?
        <Box className="personal-info__container">
            <Box className="title__box" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h5' component={'div'}>Thông tin cá nhân</Typography>
                <Button onClick={onShowModal}><Settings></Settings></Button>
            </Box>
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
                        <TextField
                            sx={{
                                width: '100%',
                            }}
                            label="Họ và tên"
                            variant="outlined"
                            defaultValue={personalInfo?.fullname}
                        />
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
                        />
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
                        }} label="Quyền" variant="outlined" defaultValue={personalInfo?.role} />
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
            >
                Lưu thay đổi
            </Button>
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