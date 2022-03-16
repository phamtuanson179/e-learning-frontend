import { ButtonBase, CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import examAPI from "api/examAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkLogin from "utils/checkLogin";
import image2 from '../../../assets/images/team-2.jpg';
import MKBox from "../../../components/MKBox";
import TPCardItem from "../../../components/TPCardItem";
import TPTitleSection from '../../../components/TPTitleSection';
import AddExamModal from './AddExam';
import DetailExamModal from "./DetailExam";

const convertDatas = (datas) => datas.map((data, idx) => {
    return {
        idExam: data?.id,
        image: image2,
        name: data?.name,
        questionAmount: data?.questions.length,
        route: '/exam'
    }
})
const ManageExams = () => {



    const [listExams, setListExams] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingAgain, setLoadingAgain] = useState(true);
    const [isOpenDetailExamModal, setIsOpenDetailExamModal] = useState(false)
    const [idExam, setIdExam] = useState('')

    const getListExams = async (room) => {

        const params = {
            room: room,
        };

        await examAPI.getListExamForRoom(params).then((res) => {
            if (res?.data) {
                const listExams = convertDatas(res?.data)
                setListExams(listExams)
                setLoading(false)
            }
        })

    };


    useEffect(() => {
        if (loadingAgain) {
            getListExams('AI');
            setLoadingAgain(false);
        }
    }, [loadingAgain]);

    const handleOpenDetailExamModal = () => {
        isOpenDetailExamModal(true)
    }
    const onClickExam = (idExam) => {
        setIdExam(idExam)
        setIsOpenDetailExamModal(true)
    }

    const renderListExams = () => {

        return (
            <Grid container spacing={4}>
                {listExams?.map(({ image, name, questionAmount, route, idExam }, idx) => (
                    <Grid item xs={12} md={4} sx={{ mb: 2 }} key={name}>
                        <ButtonBase
                            onClick={() => {
                                onClickExam(idExam)
                            }}
                        >
                            <TPCardItem image={image} name={name} type={'Câu hỏi'} count={questionAmount} />
                        </ButtonBase>

                    </Grid>
                ))
                }
            </Grid >
        )
    }



    return (
        <MKBox >
            <TPTitleSection title='Quản lý bài thi' />
            <Container sx={{ mt: 6, textAlign: 'center' }} >{loading ? <CircularProgress size={80} /> : renderListExams()}</Container>
            <AddExamModal loadingAgain={loadingAgain} setLoadingAgain={setLoadingAgain} />
            <DetailExamModal id={idExam} setIsOpenDetailExamModal={setIsOpenDetailExamModal} isOpenDetailExamModal={isOpenDetailExamModal} setLoadingAgain={setLoadingAgain} />
        </MKBox>
    );
}

export default ManageExams;