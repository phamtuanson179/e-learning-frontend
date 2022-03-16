import { Box, Button, ButtonBase, FormControl, FormControlLabel, Input, Modal, Radio, RadioGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import examAPI from '../../../../api/examAPI'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const checkCorrectAnswer = (answers) => {
    for (let i in answers) {
        if (answers[i]?.is_correct)
            return i
    }
}
const convertDatas = (data) => {
    return {
        ...data,
        questions: data?.questions.map((question, idx) => {
            return {
                ...question,
                correctAnswerIndex: checkCorrectAnswer(question?.answers)
            }
        })
    }
}

const DetailExamModal = ({ id, setIsOpenDetailExamModal, isOpenDetailExamModal, setLoadingAgain }) => {

    const [exam, setExam] = useState('')
    const [loading, setLoading] = useState(true)
    const getExam = async (id) => {
        if (id) {
            const params = {
                id: id
            }
            await examAPI.getExam(params).then(res => {
                const data = convertDatas(res?.data)
                setExam(data)
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        getExam(id)
    }, [id])

    const renderAnwserQuestion = (question) => {
        return (
            <FormControl>
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
            </FormControl>
        );
    };

    const handleCloseDetailExamModal = () => {
        setIsOpenDetailExamModal(false)
    }

    const renderQuestions = (questions) => {
        const result = questions.map((question, idx) => {
            return (
                <Box key={idx}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            maxHeight: '30vh',
                            overflowY: 'scroll'
                        }}
                    >
                        <Typography
                            component={"div"}
                            className='title__question'
                            variant="h5"
                        >
                            {question.content}
                        </Typography>
                    </Box>

                    <Box className='answer__container'>
                        {renderAnwserQuestion(question)}
                    </Box>
                </Box>
            )
        })
        return result
    }

    const handleDeleteExam = async () => {
        const params = {
            id: id
        }
        await examAPI.deleteExamById(params).then(() => {
            setLoadingAgain(true)
            setIsOpenDetailExamModal(false)
        })
    }
    return (
        <Modal
            open={isOpenDetailExamModal}
            onClose={handleCloseDetailExamModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {!loading
                ? <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Chi tiết bài thi
                    </Typography>

                    <Box
                        className='detail-personal-info__box'
                        sx={{
                            margin: '32px auto',
                            maxHeight: '60vh',
                            overflowY: 'scroll'
                        }}
                    >
                        <Box className='left__section'>
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    Tên bài thi
                                </Typography>
                                <Input
                                    sx={{
                                        flex: 2,
                                    }}
                                    value={exam?.name}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    Thời gian
                                </Typography>
                                <Input
                                    sx={{
                                        flex: 2,
                                    }}
                                    value={exam?.duration}
                                />

                            </Box>
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    Số câu đúng tối thiểu
                                </Typography>
                                <Input
                                    sx={{
                                        flex: 2,
                                    }}
                                    value={exam?.min_point_to_pass / 10}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    Thuộc phòng
                                </Typography>
                                <Input
                                    sx={{ flex: 2, }}
                                    value={exam?.require_rooms}
                                />
                            </Box>
                        </Box>
                        <Box className='right__section'>
                            {renderQuestions(exam?.questions)}
                        </Box>
                        <ButtonBase onClick={handleDeleteExam}>Xoá bài thi</ButtonBase>
                    </Box>
                </Box> : <></>}

        </Modal>
    )
}

export default DetailExamModal