import { useEffect, useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { Box, Button, Card, CardContent, CardHeader, Icon, Typography } from "@mui/material";
import infoAPI from "api/infoAPI";
import { Settings } from "@mui/icons-material";
import ModalUpdatePersonalInfo from "./ModalUpdatePersonalInfo";

const PersonalInfo = () => {
    const [checked, setChecked] = useState(true);
    const [personalInfo, setPersonalInfo] = useState('');
    const [showModalUpdatePersonalInfo, setShowModalUpdatePersonalInfo] = useState(false)

    const getPersonalInfo = async () => {
        await infoAPI.getInfo().then((res) => {
            setPersonalInfo(res)
        })
    }

    useEffect(() => {
        getPersonalInfo()
    }, [])

    const handleChecked = () => setChecked(!checked);

    const onShowModal = () => {
        setShowModalUpdatePersonalInfo(true)
    }
    return (
        <Box className="personal-info__container">
            <Box className="title__box" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component={'h3'}>Thông tin cá nhân</Typography>
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