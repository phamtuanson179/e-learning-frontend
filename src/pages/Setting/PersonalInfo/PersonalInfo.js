import { Settings } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import infoAPI from "api/infoAPI";
import { useEffect, useState } from "react";
import ModalUpdatePersonalInfo from "./ModalUpdatePersonalInfo";



const PersonalInfo = () => {
    const [personalInfo, setPersonalInfo] = useState('');
    const [showModalUpdatePersonalInfo, setShowModalUpdatePersonalInfo] = useState(false);

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
    return (
        <Box className="personal-info__container">
            <Box className="title__box" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h5' component={'div'}>Thông tin cá nhân</Typography>
                <Button onClick={onShowModal}><Settings></Settings></Button>
            </Box>
            <Grid
                className='detail-personal-info__box'
                container
                sx={{
                    margin: '32px auto',
                    maxWidth: '375px',
                }}
                spacing={2}
                rowSpacing={2}
            >
                <Grid item xs={4} className='left__label'>Họ và tên</Grid>
                <Grid item xs={8} className='right__detail'>{personalInfo?.fullname}</Grid>
                <Grid item xs={4} className='left__label'>Ngày sinh</Grid>
                <Grid item xs={8} className='right__detail'>{personalInfo?.date_of_birth}</Grid>
                <Grid item xs={4} className='left__label'>Email</Grid>
                <Grid item xs={8} className='right__detail'>{personalInfo?.email}</Grid>
                <Grid item xs={4} className='left__label'>Vị trí</Grid>
                <Grid item xs={8} className='right__detail'>{personalInfo?.position}</Grid>
                <Grid item xs={4} className='left__label'>Quyền</Grid>
                <Grid item xs={8} className='right__detail'>{personalInfo?.role === 1 ? 'admin' : 'member'}</Grid>
                <Grid item xs={4} className='left__label'>Phòng</Grid>
                <Grid item xs={8} className='right__detail'>{personalInfo?.room}</Grid>
            </Grid>
            <ModalUpdatePersonalInfo
                setShowModalUpdatePersonalInfo={setShowModalUpdatePersonalInfo}
                showModalUpdatePersonalInfo={showModalUpdatePersonalInfo}
                personalInfo={personalInfo}
                setPersonalInfo={setPersonalInfo}
            />
        </Box>

    );
}

export default PersonalInfo;