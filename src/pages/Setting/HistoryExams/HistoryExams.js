import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, CircularProgress, Typography } from "@mui/material";
import { Progress } from 'antd';
import examAPI from 'api/examAPI';
import { useEffect, useState } from "react";
import './HistoryExams.scss';
import TableHistoryExam from "./TableHistoryExam";
import { isEmpty } from 'lodash'
import { convertSecondToTime } from 'utils/convert'
import LastestResult from './LastestResult';
import RankExam from './RankExam';
import { useLocation } from 'react-router-dom';



const HistoryExam = () => {

    const [idExam, setIdExam] = useState();
    const [historyExamList, setHistoryExamList] = useState();
    const [lastestResultExam, setLastestResultExam] = useState();
    const location = useLocation()
    const getHistoryExamList = async (examId, userId) => {
        const params = {
            exam_id: examId,
            user_id: userId
        }
        await examAPI.getExamHistory(params).then((res) => {
            console.log({ res })
            setHistoryExamList(res?.data)
            setLastestResultExam(res?.data[res?.data.length - 1])
        })
    }


    useEffect(() => {
        if (location.state?.idExam) {
            getHistoryExamList(location.state?.idExam, localStorage.getItem('userId'))
        } else
            getHistoryExamList('TEL1647318825.950605', localStorage.getItem('userId'))
    }, [])



    if (isEmpty(historyExamList && lastestResultExam))
        return <CircularProgress />


    return (
        <Box className="history-exam__container">
            <Box className="title__box" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h5' component={'div'}>Lịch sử thi</Typography>
            </Box>
            <Box>
                <Box sx={{ display: 'flex', margin: 2 }}>
                    <LastestResult lastestResultExam={lastestResultExam} />
                    <RankExam />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
                    <TableHistoryExam historyExamList={historyExamList} />
                </Box>
            </Box>

        </Box>
    );
}

export default HistoryExam;