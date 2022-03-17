import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, ButtonBase, Divider, FormControlLabel, Grid, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import examAPI from 'api/examAPI';
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import './AddExamModal.scss';
import AddQuestionModal from './AddQuestionModal';

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
        console.log({ data })
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
                    <Box sx={style} >
                        <Box display="flex" alginItems="center" justifyContent="space-between" sx={{ marginTop: 2, marginLeft: 2, marginRight: 2 }}>
                            <Typography id="modal-modal-title" variant="h5">
                                Thêm bài thi
                            </Typography>
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleCloseAddExamModal} />
                        </Box>
                        <Divider />
                        <Box p={2}>
                            <form onSubmit={handleSubmit(onSubmit)} id='form-add-exam'>
                                <Box>
                                    <Box >
                                        <Controller
                                            name='name'
                                            control={control}
                                            render={({ field }) => {
                                                return (<TextField
                                                    sx={{ width: '100%', marginBottom: 1 }}
                                                    variant="outlined"
                                                    label="Tên bài thi"
                                                    helperText={errors?.name?.message}
                                                    {...field}
                                                />)
                                            }}
                                        />

                                        <Controller
                                            name='duration'
                                            control={control}
                                            render={({ field }) => {
                                                return (<TextField
                                                    sx={{ width: '100%', marginBottom: 1 }}
                                                    variant="outlined"
                                                    label="Thời gian"
                                                    {...field} />)
                                            }}
                                        />

                                        <Controller
                                            name='minCorrectAnswers'
                                            control={control}
                                            render={({ field }) => {
                                                return (<TextField
                                                    sx={{ width: '100%', marginBottom: 1 }}
                                                    variant="outlined"
                                                    label="Số câu đúng tối thiểu"
                                                    {...field} />)
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
                                                return (<TextField
                                                    sx={{ width: '100%', marginBottom: 1 }}
                                                    variant="outlined"
                                                    label="Thuộc phòng"
                                                    {...field} />)
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Box className='right__section' fullWidth={true}>
                                    {renderQuestions(questionList)}
                                </Box>

                            </form>
                        </Box>

                        <AddQuestionModal setQuestionList={setQuestionList} questionList={questionList} />
                        <Box display="flex" justifyContent="right" sx={{ margin: 2, marginTop: 4 }}>
                            <Button variant="gradient" color="dark" onClick={handleCloseAddExamModal} sx={{ marginRight: 2 }} >
                                Đóng
                            </Button>
                            <Button color="info" type='submit' form='form-add-exam'  >
                                Lưu
                            </Button>
                        </Box>
                    </Box>
                </Modal >
            </Box>
        </>
    )
}

export default AddExamModal