import { Box, Button, FormControlLabel, Grid, Input, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import infoAPI from '../../../api/infoAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Upload } from 'antd';
import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

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



const yupSchema = yup.object().shape({
    fullname: yup.string().required('Trường này bắt buộc!'),
    email: yup.string().required('Trường này bắt buộc!').email('Chưa đúng định dạng!'),
})

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const ModalUpdatePersonalInfo = ({
    setShowModalUpdatePersonalInfo,
    showModalUpdatePersonalInfo,
    personalInfo,
    setPersonalInfo
}) => {

    const onCloseModal = () => {
        setShowModalUpdatePersonalInfo(false)
    }

    const { register, handleSubmit, control, formState: { errors } } = useForm({ resolver: yupResolver(yupSchema) });

    const onSubmit = async (data) => {
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

    const handleChange = info => {
        console.log({ info })
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                console.log({ imageUrl })
                setImageUrl(imageUrl)
            }
            );
        }
    };
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState()

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (

        <Modal
            open={showModalUpdatePersonalInfo}
            onClose={onCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6">
                    Thay đổi thông tin cá nhân
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
                    {/* {uploadButton} */}
                    {/* </Upload> */}
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
                            <Controller
                                name='fullname'
                                control={control}
                                defaultValue={personalInfo?.fullname}
                                render={({ field }) => {
                                    return (<Input sx={{ flex: 2 }} {...field} />)
                                }}
                            />
                            <Typography variant='body2' >{errors.fullname?.message}</Typography>
                        </Grid>
                        <Grid item xs={4} className='left__label'>Ngày sinh</Grid>
                        <Grid item xs={8} className='right__detail'>
                            <Controller
                                name='date_of_birth'
                                control={control}
                                defaultValue={personalInfo?.date_of_birth}
                                render={({ field }) => {
                                    return (< TextField
                                        id="date"
                                        label="Birthday"
                                        type="date"
                                        // defaultValue="2017-05-24"
                                        sx={{ width: 220 }
                                        }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...field}
                                    />
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} className='left__label'>Email</Grid>
                        <Grid item xs={8} className='right__detail'>
                            <Controller
                                name='email'
                                control={control}
                                defaultValue={personalInfo?.email}
                                render={({ field }) => {
                                    return (<Input type='email' {...field} />)
                                }}
                            />
                            <Typography variant='body2' >{errors.email?.message}</Typography>
                        </Grid>
                        <Grid item xs={4} className='left__label'>Vị trí</Grid>
                        <Grid item xs={8} className='right__detail'>
                            <Controller
                                name='position'
                                control={control}
                                defaultValue={personalInfo?.position}
                                render={({ field }) => {
                                    return (<RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        {...field}
                                    >
                                        <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
                                        <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
                                        <FormControlLabel value="other" disabled control={<Radio />} label="Other" />
                                    </RadioGroup>)
                                }}
                            />

                        </Grid>
                        <Grid item xs={4} className='left__label'>Quyền</Grid>
                        <Grid item xs={8} className='right__detail'>
                            <Controller
                                name='role'
                                control={control}
                                defaultValue={personalInfo?.role}
                                render={({ field }) => {
                                    return (<RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        {...field}
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="Admin" />
                                        <FormControlLabel value="0" control={<Radio />} label="Member" />
                                        <FormControlLabel value="other" disabled control={<Radio />} label="Other" />
                                    </RadioGroup>)
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} className='left__label'>Phòng</Grid>
                        <Grid item xs={8} className='right__detail'>
                            <Controller
                                name='room'
                                control={control}
                                defaultValue={personalInfo?.room}
                                render={({ field }) => {
                                    return (<RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="AI" control={<Radio />} label="AI" />
                                        <FormControlLabel value="other" disabled control={<Radio />} label="Other" />
                                    </RadioGroup>)
                                }}
                            />

                        </Grid>
                    </Grid>
                    <Button type='submit'>Lưu</Button>
                </form>
            </Box>
        </Modal >


    )
}

export default ModalUpdatePersonalInfo