import {
  Box,
  Button,
  ButtonBase,
  FormControl,
  FormControlLabel,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MKButton from "components/MKButton";

import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";
import { useEffect, useState } from "react";
import examAPI from "../../../../api/examAPI";
import unknowExam from "assets/images/techpro-images/unknowExam.png";

const style = {
  bgcolor: "background.paper",
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  maxWidth: "500px",
  flexDirection: "column",
  borderRadius: "12px",
  bgColor: "white",
  border: "1px solid #0000003d",
};

const DetailExamModal = ({
  exam,
  setIsOpenDetailExamModal,
  isOpenDetailExamModal,
  setLoading,
}) => {
  console.log({ exam });
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [openNoti, setOpenNoti] = useState(false);

  const renderAnwserQuestion = (question) => {
    return (
      <Box>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          name='radio-buttons-group'
          value={question?.correctAnswerIndex ?? ""}
          sx={{ marginLeft: 1 }}
        >
          {question?.answers?.map((anwser, idx) => (
            <FormControlLabel
              value={idx}
              key={idx}
              label={
                <Typography
                  sx={{ display: "inline" }}
                  variant='body2'
                  fontWeight={400}
                >
                  {anwser.content}
                </Typography>
              }
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </Box>
    );
  };

  const handleCloseDetailExamModal = () => {
    setIsOpenDetailExamModal(false);
  };

  const renderQuestions = (questions) => {
    const result = questions.map((question, idx) => {
      return (
        <Box
          key={idx}
          sx={{
            bgcolor: "#F2F3F5",
            borderRadius: "12px",
            margin: 2,
            padding: 1.5,
          }}
        >
          <Box>
            <Typography
              component={"div"}
              className='title__question'
              variant='h5'
              fontWeight={700}
              marginBottom={1}
            >
              {question.content}
            </Typography>

            <Box className='answer__container'>
              {renderAnwserQuestion(question)}
            </Box>
          </Box>
        </Box>
      );
    });
    return result;
  };

  const handleDeleteExam = async () => {
    const params = {
      id: exam?.id,
    };
    await examAPI.deleteExamById(params).then((res) => {
      if (res?.status == 200) {
        setNotification({
          message: "Xoá bài thi thành công!",
          type: NOTIFICATION.SUCCESS,
        });
        setOpenNoti(true);
        setLoading(true);
        setIsOpenDetailExamModal(false);
      } else {
        setNotification({
          message: "Xoá bài thi thất bại!",
          type: NOTIFICATION.ERROR,
        });
        setOpenNoti(true);
      }
    });
  };
  return (
    <Modal
      sx={{
        overflowY: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={isOpenDetailExamModal}
      onClose={handleCloseDetailExamModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Box
          display='flex'
          alginItems='center'
          justifyContent='space-between'
          sx={{ marginTop: 2, marginLeft: 2, marginRight: 2 }}
        >
          <Typography id='modal-modal-title' variant='h5'>
            Chi tiết bài thi
          </Typography>
          <CloseIcon
            fontSize='medium'
            sx={{ cursor: "pointer" }}
            onClick={handleCloseDetailExamModal}
          />
        </Box>
        <Divider />
        <Box
          margin={"auto"}
          overflow='hidden'
          borderRadius={1.5}
          width={120}
          height={120}
          border={"1px solid rgba(0,0,0,0.2)"}
          display='flex'
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            src={exam?.image ? exam?.image : unknowExam}
            width={120}
            height={120}
          />
        </Box>
        <Box sx={{ margin: 2, marginTop: 0, marginBottom: 0 }}>
          <TextField
            sx={{
              width: "100%",
              marginBottom: 2,
            }}
            size='normal'
            variant='standard'
            label='Tên bài thi'
            value={exam?.name}
          />

          <TextField
            sx={{ width: "100%", marginBottom: 2 }}
            variant='standard'
            label='Thời gian'
            value={exam?.duration}
          />

          <TextField
            sx={{ width: "100%", marginBottom: 2 }}
            variant='standard'
            label='Số câu đúng tối thiểu'
            value={exam?.min_point_to_pass / 10}
          />

          <TextField
            sx={{ width: "100%", marginBottom: 2 }}
            variant='standard'
            label='Thuộc phòng'
            value={exam?.require_rooms}
          />
        </Box>
        <Box
          className='questions__section'
          sx={{ maxHeight: "30vh", overflowY: "scroll", marginBottom: 2 }}
        >
          {renderQuestions(exam?.questions)}
        </Box>
        <Box sx={{ textAlign: "right", margin: 2 }}>
          <MKButton onClick={handleDeleteExam} color='error'>
            Xoá bài thi
          </MKButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailExamModal;
