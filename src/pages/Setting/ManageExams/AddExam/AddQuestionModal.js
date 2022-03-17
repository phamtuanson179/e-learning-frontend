import { Box, Grid, Input, Modal, Typography, TextField, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     maxWidth: 800,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
    
// };

const style = {
    bgcolor: 'background.paper',
    position:'relative',
    transform: 'translate(100%, 0%)',
    maxWidth:1200,
    display:'flex',
    flexDirection:'column',
    borderRadius:'12px',
    bgColor:'white',
    shadow:'xl',
};

const yupSchema = yup.object().shape(
    {
        content: yup.string().required('Trường này bắt buộc!'),
        ans0: yup.string().required('Trường này bắt buộc!'),
        ans1: yup.string().required('Trường này bắt buộc!'),
        ans2: yup.string().required('Trường này bắt buộc!'),
        ans3: yup.string().required('Trường này bắt buộc!'),
        correctAnswerIndex: yup.string().required('Cần chọn một câu trả lời đúng!')
    }
)

const AddQuestionModal = ({ setQuestionList, questionList }) => {


    const [isOpenAddQuestionModal, setIsOpenAddQuestionModal] = useState(false)
    // const [question, setQuestion] = useState('')

    const handleCloseAddQuestionModal = () => {
        setIsOpenAddQuestionModal(false)
    }

    const handleOpenAddQuestionModal = () => {
        setIsOpenAddQuestionModal(true)
    }


    const { handleSubmit, control, reset, formState: { errors } } = useForm({ resolver: yupResolver(yupSchema) });

    const handleAnwsers = (correctAnswerIndex, answerList) => {
        let answers = [];
        for (let i = 0; i < answerList.length; i++) {
            let answer = {
                content: answerList[i],
                is_correct: false,
                url_file: null
            }
            if (correctAnswerIndex == i) {
                answer.is_correct = true
            }
            answers.push(answer)
        }
        return answers
    }

    const onSubmit = async (data) => {
        const newQuestion = {
            content: data.content,
            type: 1,
            url_file: "",
            correctAnswerIndex: data.correctAnswerIndex,
            answers: handleAnwsers(data.correctAnswerIndex, [data.ans0, data.ans1, data.ans2, data.ans3])
        }
        console.log({ questionList })
        setQuestionList([
            ...questionList,
            newQuestion
        ])
        setIsOpenAddQuestionModal(false)
        reset({})
    }
    return (

        <>
            <Grid container item xs={12} lg={10} justifyContent="center" mx="auto">
                <MKButton onClick={handleOpenAddQuestionModal} sx={{border:'2px solid #1A73E8', color:'#1A73E8'}}>
                    Thêm câu hỏi
                </MKButton>
            </Grid>

            <Modal
                hideBackdrop
                open={isOpenAddQuestionModal}
                onClose={handleCloseAddQuestionModal}
                sx={{ display: "grid",
                placeItems:"Center"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <MKBox sx={style}>
                    <Box display="flex" alginItems="center" justifyContent="space-between" p={2}>
                        <Typography id="modal-modal-title" variant="h5">
                            Thêm câu hỏi mới
                        </Typography>
                    </Box>

                        <form onSubmit={handleSubmit(onSubmit)} >
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
                                <Grid item xs={4} className='left__label'>Câu hỏi</Grid>
                                <Grid item xs={8} className='right__detail'>
                                    <Controller
                                        name='content'
                                        control={control}
                                        render={({ field }) => {
                                            return (<Input defaultValue='' {...field} />)
                                        }}
                                    />
                                    <Typography variant='body2'>{errors.content?.message}</Typography>

                                </Grid>
                                <Grid item xs={4} className='left__label'>Câu trả lời</Grid>
                                <Grid item xs={8} className='right__detail'>
                                    {/* <FormControl> */}
                                    <Controller
                                        rules={{ required: true }}
                                        control={control}
                                        name="correctAnswerIndex"
                                        render={({ field }) => {
                                            return (
                                                <RadioGroup {...field}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <FormControlLabel value='0' control={<Radio />} label="" sx={{ display: 'flex' }} />
                                                        <Controller
                                                            name='ans0'
                                                            control={control}
                                                            render={({ field }) => {
                                                                return (<Input defaultValue='' {...field} />)
                                                            }}
                                                        />
                                                    </Box>
                                                    <Typography variant='body2'>{errors.ans0?.message}</Typography>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <FormControlLabel value='1' control={<Radio />} label="" />
                                                        <Controller
                                                            name='ans1'
                                                            control={control}
                                                            render={({ field }) => {
                                                                return (<Input defaultValue='' {...field} />)
                                                            }}
                                                        />
                                                    </Box>
                                                    <Typography variant='body2'>{errors.ans1?.message}</Typography>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <FormControlLabel value="2" control={<Radio />} label="" />
                                                        <Controller
                                                            name='ans2'
                                                            control={control}
                                                            render={({ field }) => {
                                                                return (<Input defaultValue='' {...field} />)
                                                            }}
                                                        />
                                                    </Box>
                                                    <Typography variant='body2'>{errors.ans2?.message}</Typography>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <FormControlLabel value="3" control={<Radio />} label="" />
                                                        <Controller
                                                            name='ans3'
                                                            control={control}
                                                            render={({ field }) => {
                                                                return (<Input defaultValue='' {...field} />)
                                                            }}
                                                        />
                                                    </Box>
                                                    <Typography variant='body2'>{errors.ans3?.message}</Typography>
                                                </RadioGroup>)
                                        }}
                                    />
                                    <Typography variant='body2'>{errors.correctAnswerIndex?.message}</Typography>

                                </Grid>
                            </Grid>
                            <MKBox display="flex" justifyContent="space-between" p={1.5}>
                            <MKButton variant="gradient" color="dark" onClick={handleCloseAddQuestionModal} sx={{marginLeft:'122px',padding:'10px',height:'40px', width:'97px'}} >
                                Đóng
                            </MKButton>
                            <MKButton type='submit' form='form-add-exam' color ="info" sx={{ padding:'10px',height:'40px', width:'97px'}}>
                                Lưu
                            </MKButton>
                        </MKBox>
                        </form>
                </MKBox>
            </Modal >
        </>



    )
}

export default AddQuestionModal