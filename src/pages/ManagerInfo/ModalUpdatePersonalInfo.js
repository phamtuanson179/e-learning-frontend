import { Box, Grid, Input, Modal, Typography, TextField, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DatePicker } from 'antd'
import { DesktopDatePicker } from '@mui/lab';
import infoAPI from '../../api/infoAPI'
import { Password } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalUpdatePersonalInfo = ({
    setShowModalUpdatePersonalInfo,
    showModalUpdatePersonalInfo,
    personalInfo,
    setPersonalInfo
}) => {

    const onCloseModal = () => {
        setShowModalUpdatePersonalInfo(false)
    }

    const { register, handleSubmit } = useForm({
        defaultValues: {
            'fullname': personalInfo?.fullname,
            'date_of_birth': personalInfo?.date_of_birth,
            'email': personalInfo?.email,
            'position': personalInfo?.position,
            'role': personalInfo?.role,
            'room': personalInfo?.room
        }
    });

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
        console.log({ newData })
        await infoAPI.putUpdateUser(newData).then(() => {
            setPersonalInfo(newData)
            setShowModalUpdatePersonalInfo(false)
        })
    }
    return (

        <Modal
            open={showModalUpdatePersonalInfo}
            onClose={onCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Thay đổi thông tin cá nhân
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {console.log({})}
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
                        <Grid item xs={8} className='right__detail'>
                            <Input {...register('fullname', { required: true })} defaultValue={personalInfo?.fullname}></Input>
                        </Grid>
                        <Grid item xs={4} className='left__label'>Ngày sinh</Grid>
                        <Grid item xs={8} className='right__detail'>
                            {/* < {...register('date_of_birth')} defaultValue={personalInfo?.date_of_birth} /> */}
                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                defaultValue="2017-05-24"
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('date_of_birth', { required: true })}
                            />
                        </Grid>
                        <Grid item xs={4} className='left__label'>Email</Grid>
                        <Grid item xs={8} className='right__detail'>
                            <Input type='email' {...register('email', { required: true })} defaultValue={personalInfo?.email}></Input>
                        </Grid>
                        <Grid item xs={4} className='left__label'>Vị trí</Grid>
                        <Grid item xs={8} className='right__detail'>
                            {/* <Input {...register('position')} defaultValue={personalInfo?.position}></Input> */}

                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                {...register('position')}
                                defaultValue={personalInfo?.position}
                            >
                                <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
                                <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
                                <FormControlLabel value="other" disabled control={<Radio />} label="Other" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={4} className='left__label'>Quyền</Grid>
                        <Grid item xs={8} className='right__detail'>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                {...register('role')}
                                defaultValue={personalInfo?.role}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Admin" />
                                <FormControlLabel value="0" control={<Radio />} label="Member" />
                                <FormControlLabel value="other" disabled control={<Radio />} label="Other" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={4} className='left__label'>Phòng</Grid>
                        <Grid item xs={8} className='right__detail'>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                {...register('room')}
                                defaultValue={personalInfo?.room}
                            >
                                <FormControlLabel value="AI" control={<Radio />} label="AI" />
                                <FormControlLabel value="other" disabled control={<Radio />} label="Other" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Button type='submit'>Lưu</Button>
                </form>
            </Box>
        </Modal >


    )
}

export default ModalUpdatePersonalInfo