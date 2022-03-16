import { useEffect, useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { STATUS } from './constant'
import { Box } from "@mui/material";

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
const ResultModal = ({ showModalResult, setShowModalResult, questions, questionAmount, minPointToPass }) => {

    const [point, setPoint] = useState(0)
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
    const toggleModal = () => {
        setShowModalResult(!showModalResult)
    }
    return (
        <MKBox component="section" >
            <Box>
                {/* <Grid container item xs={12} lg={10} justifyContent="center" mx="auto"> */}
                <MKButton variant="gradient" color="info" onClick={toggleModal}>
                    Nộp bài
                </MKButton>
                {/* </Grid> */}
                <Modal
                    open={showModalResult}
                    onClose={toggleModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ display: "grid", placeItems: "center" }}>
                    <MKBox sx={style}>
                        <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                            <MKTypography variant="h5">Kết quả thi</MKTypography>
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
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
                                {!showModalResult ? '' : point >= minPointToPass ? 'Chúc mừng bạn đã vuợt qua bài thi!' : 'Bạn chưa vượt qua bài thi, bạn cần ôn tập kỹ hơn để hoàn thành bài thi này.'}
                            </MKTypography>
                        </MKBox>
                        <MKBox display="flex" justifyContent="right" p={2}>
                            <MKButton ariant="gradient" color="info" onClick={toggleModal}>
                                Xác nhận
                            </MKButton>
                        </MKBox>
                    </MKBox>
                </Modal>
            </Box >
        </MKBox >
    )

}

export default ResultModal;