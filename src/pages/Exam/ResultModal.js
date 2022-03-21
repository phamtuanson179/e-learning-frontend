import { useEffect, useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// @mui iconsimport TPNotification from "components/TPNotification";
import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { STATUS } from './constant'
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import examAPI from "api/examAPI";

const style = {
    bgcolor: 'background.paper',
    position: 'relative',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    bgColor: 'white',
    shadow: 'xl',
    border: '12px',

};
const ResultModal = ({ showModalResult, setShowModalResult, questions, questionAmount, minPointToPass, isFinish, setIsFinish, idExam, countDown, duration }) => {
    const navigate = useNavigate()
    const [notification, setNotification] = useState({ type: '', message: '' });
    const [openNoti, setOpenNoti] = useState(false)

    const [point, setPoint] = useState(0)
    const [isPass, setIsPass] = useState()
    const excutePointOfExam = () => {
        let result = 0;
        for (let question of questions) {
            if (question.status === STATUS.CORRECT) {
                result += 10
            }
        }
        setPoint(result)
    }

    useEffect(() => {
        excutePointOfExam()
    }, [showModalResult])

    useEffect(() => {
        point >= minPointToPass ? setIsPass(true) : setIsPass(false)
    }, [point])
    const handleCloseModal = async () => {
        const body = {
            user_id: localStorage.getItem('userId'),
            exam_id: idExam,
            point: point,
            max_point: questionAmount * 10,
            is_pass: isPass,
            duration: duration - countDown
        }
        await examAPI.postSaveExam(body).then((res) => {
            if (res?.status === 200) {
                setNotification({
                    message: 'Lưu kết quả thành công!',
                    type: NOTIFICATION.SUCCESS
                })
                setOpenNoti(true)
                setTimeout(() => {
                    setShowModalResult(false)
                    navigate('/setting', { state: { idExam: idExam } })
                }, 3000)

            } else {
                setNotification({
                    message: 'Lưu kết quả thất bại!',
                    type: NOTIFICATION.ERROR
                })
                setOpenNoti(true)
            }
        })
    }
    const handleOpenModal = () => {
        setIsFinish(true)
        setShowModalResult(true)
    }
    return (
        <MKBox component="section" >
            <Box>
                <MKButton variant="gradient" color="info" onClick={handleOpenModal}>
                    Nộp bài
                </MKButton>
                <Modal
                    open={showModalResult}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ display: "grid", placeItems: "center" }}>
                    <MKBox sx={style}>
                        <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                            <MKTypography variant="h5">Kết quả thi</MKTypography>
                        </MKBox>
                        <MKBox p={2}>
                            <MKTypography
                                variant="body2"
                                color="secondary"
                                fontWeight="regular"
                                mt='2'
                                mb={3}>
                                Điểm: {`${point}/${10 * questionAmount}`}
                            </MKTypography>
                            <MKTypography variant="h6" sx={{ fontStyle: 'italic' }}>
                                {isPass ? 'Chúc mừng bạn đã vuợt qua bài thi!' : 'Bạn chưa vượt qua bài thi, bạn cần ôn tập kỹ hơn để hoàn thành bài thi này.'}
                            </MKTypography>
                        </MKBox>
                        <MKBox display="flex" justifyContent="right" p={2}>
                            <MKButton ariant="gradient" color="info" onClick={handleCloseModal}>
                                Xác nhận
                            </MKButton>
                        </MKBox>
                    </MKBox>
                </Modal>
            </Box >
            <TPNotification type={notification.type} message={notification.message} open={openNoti
            } setOpen={setOpenNoti} />
        </MKBox >
    )

}

export default ResultModal;