import { Box, Grid, Input, Modal, Typography, TextField, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
            <Button onClick={handleOpenAddQuestionModal}>Thêm câu hỏi</Button>

            <Modal
                hideBackdrop
                open={isOpenAddQuestionModal}
                onClose={handleCloseAddQuestionModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thêm câu hỏi mới
                    </Typography>

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
                        <Button onClick={handleCloseAddQuestionModal}>Đóng</Button>
                        <Button type='submit'>Lưu</Button>
                    </form>
                </Box>
            </Modal >
        </>



    )
}

export default AddQuestionModal