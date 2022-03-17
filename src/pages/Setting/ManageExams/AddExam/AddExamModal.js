import { Box, Grid, Slide, Container, Button, FormControl, FormControlLabel, Input, Modal, Radio, RadioGroup, Typography, Divider } from '@mui/material';
import examAPI from 'api/examAPI';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import './AddExamModal.scss';
import AddQuestionModal from './AddQuestionModal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MKButton from "components/MKButton";
import CloseIcon from "@mui/icons-material/Close";
import MKTypography from 'components/MKTypography';
import MKInput from "components/MKInput";
import MKBox from "components/MKBox";

const style = {
    bgcolor: 'background.paper',
    position: 'relative',
    width: '348px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    bgColor: 'white',
    shadow: 'xl',
};


const initExam =
{
    name: "",
    minCorrectAnswers: null,
    duration: null,
    require_rooms: [
        'AI'
    ],
    questions: []
}

const yupSchema = yup.object().shape({
    name: yup.string().required('Trường này bắt buộc!'),
    duration: yup.number().required('Trường này bắt buộc').integer('Cần nhập số nguyên!').min(0, 'Cần nhập số nguyên dương'),
    minCorrectAnswers: yup.number().required('Trường này bắt buộc').integer('Cần nhập số nguyên!').min(0, 'Cần nhập số nguyên dương'),
    requireRoom: yup.string().required('Trường này bắt buộc!')
})

const AddExamModal = ({ setLoadingAgain, loadingAgain }) => {
    const [isOpenAddExamModal, setIsOpenAddExamModal] = useState(false);
    const [exam, setExam] = useState(initExam)
    const [questionList, setQuestionList] = useState([])

    const handleCloseAddExamModal = () => {
        setIsOpenAddExamModal(false)
    }

    const handleOpenAddExamModal = () => {
        setIsOpenAddExamModal(true)
    }

    const { control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(yupSchema) });

    useEffect(() => {
        console.log({ questionList })
        setExam({
            ...exam,
            questions: questionList
        })
    }, [questionList])

    const renderAnwserQuestion = (question) => {
        return (
            <Box>
                <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    name='radio-buttons-group'
                    value={question?.correctAnswerIndex ?? ''}
                >
                    {question?.answers?.map((anwser, idx) => (
                        <FormControlLabel
                            value={idx}
                            key={idx}
                            label={anwser.content}
                            control={<Radio />}
                        />
                    ))}
                </RadioGroup>
            </Box>
        );
    };

    const handleDeleteQuestion = (question) => {
        const newQuestionList = questionList.filter((item) => item != question)
        setQuestionList(newQuestionList)
    }

    const renderQuestions = (questions) => {
        const result = questions.map((question, idx) => {
            return (
                <Box key={idx} sx={{ bgcolor: '#F2F3F5', borderRadius: '12px', marginBottom: '12px' }}>
                    <Box>
                        <Typography
                            component={"div"}
                            className='title__question'
                            variant="h5"
                        >
                            {question.content}
                        </Typography>
                        <Box className='answer__container'>
                            {renderAnwserQuestion(question)}
                        </Box>
                        <Button onClick={() => handleDeleteQuestion(question)} size='small' sx={{ marginLeft: '190px' }}>
                            Xoá câu hỏi
                        </Button>
                    </Box>


                </Box>
            )
        })
        return result

    }

    const onSubmit = async (data) => {
        const convertQuestionList = questionList.map((question) => {
            const convertQuestion = {
                content: question.content,
                type: 1,
                url_file: "",
                answers: question.answers
            }
            return convertQuestion
        })

        const convertData = (data) => {
            return {
                name: data.name,
                min_point_to_pass: data.minCorrectAnswers * 10,
                duration: data.duration,
                require_rooms: [
                    data.requireRoom
                ],
                created_by: localStorage.getItem('email'),
                questions: convertQuestionList
            }
        }
        const newData = convertData(data)

        await examAPI.addExamByAdmin(newData).then(() => {
            setLoadingAgain(true)
            setIsOpenAddExamModal(false)
            reset()
            setQuestionList([])
        })
    }
    return (
<<<<<<< HEAD
        <Box className='add-exam__container'>
            <Button onClick={handleOpenAddExamModal}>Thêm bài thi</Button>
            <Modal
                open={isOpenAddExamModal}
                onClose={handleCloseAddExamModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thêm bài thi mới
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} id='form-add-exam'>
                        <Box
                            className='detail-personal-info__box'
                            sx={{
                                margin: '32px auto',
                                maxHeight: '60vh',
                                overflowY: 'scroll'
                            }}
                        >
                            <Box className='left__section'>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ flex: 1 }}>
                                        Tên bài thi
                                    </Typography>
                                    <Controller
                                        name='name'
                                        control={control}
                                        render={({ field }) => {
                                            return (<Input sx={{ flex: 2 }} {...field} defaultValue='' />)
                                        }}
                                    />
                                </Box>
                                <Typography variant='body2' textAlign={'right'}>{errors.name?.message}</Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography
                                        variant='body1'
                                        sx={{ flex: 1 }}
                                    >
                                        Thời gian
                                    </Typography>
                                    <Controller
                                        name='duration'
                                        control={control}
                                        render={({ field }) => {
                                            return (<Input sx={{ flex: 2 }} type='number'
                                                defaultValue='0' {...field} />)
                                        }}
                                    />
                                </Box>
                                <Typography variant='body2' textAlign={'right'}>{errors.duration?.message}</Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography
                                        variant='body1'
                                        sx={{ flex: 1 }}
                                    >
                                        Số câu đúng tối thiểu
                                    </Typography>
                                    <Controller
                                        name='minCorrectAnswers'
                                        control={control}
                                        render={({ field }) => {
                                            return (<Input sx={{ flex: 2 }}
                                                type='number'
                                                defaultValue='0' {...field} />)
                                        }}
                                    />
                                </Box>
                                <Typography variant='body2' textAlign={'right'}>{errors.minCorrectAnswers?.message}</Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography
                                        variant='body1'
                                        sx={{ flex: 1 }}
                                    >
                                        Thuộc phòng
                                    </Typography>
                                    <Controller
                                        name='requireRoom'
                                        rules={{
                                            required: true
                                        }}
                                        control={control}
                                        defaultValue="AI"
                                        render={({ field }) => {
                                            return (<Input
                                                sx={{ flex: 2 }}
                                                disabled
                                                defaultValue='AI'
                                                {...field} />)
                                        }}
                                    />
                                </Box>
                                <Typography variant='body2' textAlign={'right'}>{errors.requireRoom?.message}</Typography>
                            </Box>
                            <Box className='right__section'>
                                {renderQuestions(questionList)}
                            </Box>
                        </Box>
                    </form>
                    <AddQuestionModal setQuestionList={setQuestionList} questionList={questionList} />
                    <Button type='submit' form='form-add-exam'>Lưu</Button>
                </Box>
            </Modal >
        </Box>
=======
        <>
            {/* <Button onClick={handleOpenAddExamModal}>Thêm bài thi</Button> */}
            <Grid container item xs={12} lg={10} justifyContent="center" mx="auto">
                <MKButton variant="gradient" color="info" onClick={handleOpenAddExamModal}>
                    Thêm bài thi
                </MKButton>
            </Grid>
            <Box>
                <Modal
                    sx={{
                        overflowY: 'auto',
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    open={isOpenAddExamModal}
                    onClose={handleCloseAddExamModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <MKBox sx={style} >
                        <Box display="flex" alginItems="center" justifyContent="space-between" sx={{ marginTop: 2, marginLeft: 2, marginRight: 2 }}>
                            <Typography id="modal-modal-title" variant="h5">
                                Thêm bài thi mới
                            </Typography>
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleCloseAddExamModal} />
                        </Box>
                        <Divider />
                        <MKBox p={2}>
                            <form onSubmit={handleSubmit(onSubmit)} id='form-add-exam'>
                                <MKTypography sx={{
                                }} variant="body2" color="secondary" fontWeight="regular">
                                    <Box>
                                        <Box >
                                            <Controller
                                                name='name'
                                                control={control}
                                                render={({ field }) => {
                                                    return (<MKInput
                                                        sx={{ width: '100%', marginBottom: 1 }}
                                                        variant="standard"
                                                        label="Tên bài thi"
                                                        display='flex'
                                                        alignItems='center' mb={2}
                                                        fullWidth {...field} defaultValue='' />)
                                                }}
                                            />

                                            <Controller
                                                name='duration'
                                                control={control}
                                                render={({ field }) => {
                                                    return (<MKInput
                                                        sx={{ width: '100%', marginBottom: 1 }}

                                                        variant="standard"
                                                        label="Thời gian"
                                                        display='flex'
                                                        alignItems='center' mb={2}
                                                        fullWidth
                                                        // type='number'
                                                        defaultValue='' {...field} />)
                                                }}
                                            />

                                            <Controller
                                                name='minCorrectAnswers'
                                                control={control}
                                                render={({ field }) => {
                                                    return (<MKInput
                                                        sx={{ width: '100%', marginBottom: 1 }}

                                                        variant="standard"
                                                        label="Số câu đúng tối thiểu"
                                                        display='flex'
                                                        alignItems='center' mb={2}
                                                        // fullWidth 
                                                        // type='number'
                                                        defaultValue='' {...field} />)
                                                }}
                                            />

                                            <Controller
                                                name='requireRoom'
                                                rules={{
                                                    required: true
                                                }}
                                                control={control}
                                                defaultValue="AI"
                                                render={({ field }) => {
                                                    return (<MKInput
                                                        sx={{ width: '100%', marginBottom: 1 }}

                                                        variant="standard"
                                                        label="Thuộc phòng"
                                                        display='flex'
                                                        alignItems='center' mb={2}
                                                        // fullWidth 
                                                        // disabled
                                                        defaultValue='AI'
                                                        {...field} />)
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Box className='right__section' fullWidth={true}>
                                        {renderQuestions(questionList)}
                                    </Box>
                                </MKTypography>
                            </form>
                        </MKBox>

                        <AddQuestionModal setQuestionList={setQuestionList} questionList={questionList} />
                        <MKBox display="flex" justifyContent="right" sx={{ margin: 2, marginTop: 4 }}>
                            <MKButton variant="gradient" color="dark" onClick={handleCloseAddExamModal} sx={{ marginRight: 2 }} >
                                Đóng
                            </MKButton>
                            <MKButton type='submit' form='form-add-exam' color="info" sx={{}}>
                                Lưu
                            </MKButton>
                        </MKBox>
                    </MKBox>
                </Modal >
            </Box>
        </>
>>>>>>> 2cdf29e26b49aec9aa7880af4708c6d64a436aac
    )
}

export default AddExamModal