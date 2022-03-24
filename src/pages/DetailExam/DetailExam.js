import { Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LastestResult from 'containers/LastestResult'
import './DetailExam.scss'
import examAPI from 'api/examAPI'
import Ranking from 'containers/Ranking'
const DetailExam = () => {
    const [exam, setExam] = useState()
    const location = useLocation()
    const navigate = useNavigate()
    const [lastestResultExam, setLastestResultExam] = useState()
    const [historyExam, setHistoryExam] = useState()

    const getHistoryExam = async (params) => {
        await examAPI.getExamHistory(params).then((res) => {
            console.log({ res })
            if (res.status === 200) {
                const data = res?.data
                if (data) {
                    setHistoryExam(data)
                    setLastestResultExam(data[data.length - 1])
                }

            }
        })
    }
    const getFullRanking = async (params) => {
        await examAPI.getFullExamRanking(params).then((res) => {
            console.log({ res })
            if (res.status === 200) {
                const data = res?.data
                if (data) {
                }

            }
        })
    }
    const getShortcutRanking = async (params) => {
        await examAPI.getShortcutExamRanking(params).then((res) => {
            console.log({ res })
            if (res.status === 200) {
                const data = res?.data
                if (data) {
                }

            }
        })
    }

    useEffect(() => {
        setExam(location.state?.exam)
    }, [])

    useEffect(() => {
        const params = {
            exam_id: location.state?.exam?.id
        }
        getFullRanking(params)
        getShortcutRanking(params)
    }, [])

    useEffect(() => {
        const params = {
            user_id: localStorage.getItem('userId'),
            exam_id: location.state?.exam?.id,
        }
        getHistoryExam(params)
    }, [])


    return (
        <Card
            sx={{
                p: 2,
                mx: { xs: 2, lg: 3 },
                mt: 8,
                mb: 4,
                backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                    rgba(white.main, 0.8),
                backdropFilter: "saturate(200%) blur(30px)",
                boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
            className='detail-exam__container'
        >
            <Box component='section' py={8}>
                <Container >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, marginBottom: 2 }} className='description__exam'>
                        <Box sx={{ flex: 1 }}>
                            <img src={exam?.image} style={{
                                width: 180, height: 180
                            }} />
                        </Box>
                        <Box sx={{ flex: 2, marginLeft: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant={'h2'} marginBottom={2}>{exam?.name}</Typography>
                            <Box>
                                <Typography variant='subtitle2' >Thời gian: {exam?.duration} </Typography>
                                <Typography variant='subtitle2'>Số câu hỏi: {exam?.questionAmount}</Typography>
                                <Typography variant='subtitle2'>Số câu đúng tối thiểu: {exam?.min_point_to_pass}</Typography>
                            </Box>
                        </Box>
                        <Button className='start__button' sx={{ height: 40, alignSelf: 'center', marginLeft: 2 }} onClick={() => { navigate('/exam', { state: { exam: exam } }) }}>Bắt đầu</Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ flex: 1 }}>
                            {lastestResultExam ? <LastestResult lastestResultExam={lastestResultExam} historyExam={historyExam} /> : <CircularProgress />}
                        </Box>

                        <Box sx={{ flex: 1, height: 'initial' }} >
                            <Ranking/>
                        </Box>

                    </Box>

                </Container>
            </Box >
        </Card >
    )
}

export default DetailExam