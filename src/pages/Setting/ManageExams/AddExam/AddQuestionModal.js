import { Box, Grid, Input, Modal, Typography, TextField, RadioGroup, Radio, FormControlLabel, Button, Divider } from '@mui/material';
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'


const style = {
    bgcolor: 'background.paper',
    position: 'relative',
    display: 'flex',
    right: 0,
    width: '348px',
    flexDirection: 'column',
    borderRadius: '12px',
    bgColor: 'white',
    shadow: 'xl',
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
        console.log({ data })
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
            <Box sx={{ textAlign: 'center' }}>
                <MKButton onClick={handleOpenAddQuestionModal} sx={{ border: '2px solid #1A73E8', color: '#1A73E8' }}>
                    Thêm câu hỏi
                </MKButton>
            </Box>

            <Modal
                hideBackdrop
                open={isOpenAddQuestionModal}
                onClose={handleCloseAddQuestionModal}
                sx={{
                    display: "grid",
                    placeItems: "Center"
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <MKBox sx={style}>
                    <Box display="flex" alginItems="center" justifyContent="space-between" sx={{ marginTop: 2, marginLeft: 2, marginRight: 2 }}>
                        <Typography id="modal-modal-title" variant="h5">
                            Thêm bài thi mới
                        </Typography>
                    </Box>
                    <Divider />
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Box sx={{ margin: 2 }}>
                            <Controller
                                name='content'
                                control={control}
                                render={({ field }) => {
                                    return (<TextField id="standard-basic" label="Câu hỏi" sx={{ width: '100%', marginBottom: 3 }} variant="standard"{...field} />)
                                }}
                            />
                            <Typography variant='body2'>{errors.content?.message}</Typography>

                            <Controller
                                control={control}
                                name="correctAnswerIndex"
                                render={({ field }) => {
                                    return (
                                        <RadioGroup {...field}>
                                            <Box sx={{ display: 'flex', marginBottom: 1, alignItems: 'center' }}>
                                                <FormControlLabel value='0' control={<Radio />} label="" sx={{ width: 32, height: 32, padding: 0 }} />
                                                <Controller
                                                    name='ans0'
                                                    control={control}
                                                    render={({ field }) => {
                                                        return (<TextField id="standard-basic" label="Câu trả lời thứ nhất" sx={{ width: '100%' }} variant="standard"{...field} />)
                                                    }}
                                                />
                                            </Box>
                                            <Typography variant='body2'>{errors.ans0?.message}</Typography>
                                            <Box sx={{ display: 'flex', marginBottom: 1, alignItems: 'center' }}>
                                                <FormControlLabel value='1' control={<Radio />} label="" sx={{ width: 32, height: 32, padding: 0 }} />
                                                <Controller
                                                    name='ans1'
                                                    control={control}
                                                    render={({ field }) => {
                                                        return (<TextField id="standard-basic" label="Câu trả lời thứ hai" sx={{ width: '100%' }} variant="standard"{...field} />)
                                                    }}
                                                />
                                            </Box>
                                            <Typography variant='body2'>{errors.ans1?.message}</Typography>
                                            <Box sx={{ display: 'flex', marginBottom: 1, alignItems: 'center' }}>
                                                <FormControlLabel value="2" control={<Radio />} label="" sx={{ width: 32, height: 32, padding: 0 }} />
                                                <Controller
                                                    name='ans2'
                                                    control={control}
                                                    render={({ field }) => {
                                                        return (<TextField id="standard-basic" label="Câu trả lời thứ ba" sx={{ width: '100%' }} variant="standard"{...field} />)
                                                    }}
                                                />
                                            </Box>
                                            <Typography variant='body2'>{errors.ans2?.message}</Typography>
                                            <Box sx={{ display: 'flex', marginBottom: 1, alignItems: 'center' }}>
                                                <FormControlLabel value="3" control={<Radio />} label="" sx={{ width: 32, height: 32, padding: 0 }} />
                                                <Controller
                                                    name='ans3'
                                                    control={control}
                                                    render={({ field }) => {
                                                        return (<TextField id="standard-basic" label="Câu trả lời thứ tư" sx={{ width: '100%' }} variant="standard"{...field} />)
                                                    }}
                                                />
                                            </Box>
                                            <Typography variant='body2'>{errors.ans3?.message}</Typography>
                                        </RadioGroup>)
                                }}
                            />
                            <Typography variant='body2'>{errors.correctAnswerIndex?.message}</Typography>
                        </Box>

                    </form>
                    <Box display="flex" justifyContent="right" sx={{ margin: 2 }}>
                        <MKButton variant="gradient" color="dark" onClick={handleCloseAddQuestionModal} sx={{ marginRight: 2 }} >
                            Đóng
                        </MKButton>
                        <MKButton type='submit' form='form-add-exam' color="info" >
                            Lưu
                        </MKButton>
                    </Box>
                </MKBox>
            </Modal >
        </>



    )
}

export default AddQuestionModal