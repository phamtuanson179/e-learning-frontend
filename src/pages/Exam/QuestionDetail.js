import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
  Container,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import CloseIcon from "@mui/icons-material/Close";
import { padding } from "@mui/system";
import { useEffect, useState } from "react";
import { STATUS } from "./constant";
import { useNavigate } from "react-router-dom";

const style = {
  bgcolor: 'background.paper',
  position:'relative',
  width:'500px',
  display:'flex',
  flexDirection:'column',
  borderRadius:'12px',
  bgColor:'white',
  shadow:'xl',
  border:'12px',

};
const QuestionDetail = ({
  curQuestion,
  setCurQuestion,
  nameTest,
  questions,
  duration,
  minPointToPass,
  questionAmount, 
  loading
}) => {

  const [valueRadio, setValueRadio] = useState(-1)
  const [showModalResult, setShowModalResult] = useState(false);
  const [countDown, setCountDown] = useState(duration * 1000);
  const [time, setTime] = useState('00:00')
  useEffect(() => {
    setValueRadio(curQuestion?.curAnswer + 1 ? curQuestion?.curAnswer : -1)
  }, [curQuestion])

  useEffect(() => {
    if (curQuestion) {
      if (countDown < 0) {
        setTime('00:00')
        setShowModalResult(true)
      }
      else {
        setTimeout(() => {
          setCountDown(countDown - 1000)
          let minutes = Math.floor(countDown / (60 * 1000));
          let seconds = Math.floor(countDown % (60 * 1000) / 1000);
          setTime(`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`)
        }, 1000)
        return
      }
    }

  }, [countDown, loading])

  const onCloseModal = () => {
    setShowModalResult(false)
  }

  const progressWhenChangeAnswer = (answer, question) => {
    let curQuestion = JSON.parse(JSON.stringify(question));
    curQuestion.curAnswer = parseInt(answer);
    if (curQuestion?.curAnswer !== -1) {
      const indexAnswerCorrect = curQuestion?.answers?.findIndex(
        (answer) => answer?.is_correct == true
      );
      if (curQuestion?.curAnswer === indexAnswerCorrect) {
        curQuestion.status = STATUS.CORRECT;
      } else {
        curQuestion.status = STATUS.INCORRECT;
      }
      setCurQuestion(curQuestion);
    }
  };

  const onChangeRadioGroup = (e) => {
    const value = e.target.value;
    progressWhenChangeAnswer(value, curQuestion);
  };

  const renderAnwserQuestion = (listAnswers) => {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          name='radio-buttons-group'
          defaultValue=''
          onChange={onChangeRadioGroup}
          value={valueRadio}
        >
          {listAnswers?.map((anwser, idx) => (
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

  const onClickClearAnswer = (question) => {
    let curQuestion = JSON.parse(JSON.stringify(question));
    curQuestion.status = STATUS.NORESPONSE;
    curQuestion.curAnswer = -1;
    setCurQuestion(curQuestion);
  }

  const onSubmitExam = () => {
    setShowModalResult(true)
  }

  const excutePointOfExam = () => {
    let result = 0;
    for (let question of questions) {
      if (question.status === STATUS.CORRECT) {
        result += duration
      }
    }
    return result
  }

  return (
    <Box >
      <Box className='detail__exam' >
        <Typography component={"div"} variant='subtitle1' className="name__test">{nameTest ? nameTest : ''}</Typography>
        <Typography component={"div"} variant='subtitle1' className="countdown__oclock">Thời gian: {time}</Typography>
        <Button className="btn__submit" onClick={onSubmitExam}>Nộp bài</Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          component={"div"}
          className='title__question'
          variant="h5"
        >
          {curQuestion.content}
        </Typography>
        <Button onClick={() => onClickClearAnswer(curQuestion)}>
          Xoá lựa chọn
        </Button>
      </Box>

      <Box className='answer__container'>
        {renderAnwserQuestion(curQuestion.answers)}
      </Box>

    <MKBox component="section" py={6}> 
    <Container>
    <Modal 
      open={showModalResult} 
      onClose={onCloseModal} 
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "grid", placeItems: "center" }}>
    <MKBox sx={style}>
      <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
        <MKTypography variant="h5">Kết quả thi</MKTypography>
        <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={onCloseModal} />
      </MKBox>
      <MKBox p={2}>
        <MKTypography 
          variant="body2" 
          color="secondary" 
          fontWeight="regular" 
          mt='2' 
          mb={3}>
          Điểm: {showModalResult ? `${excutePointOfExam()}/${10 * questionAmount}` : ''}
        </MKTypography>
        <MKTypography variant="h6" sx={{ fontStyle: 'italic'}}>
          Chúc mừng bạn đã vuợt qua bài thi!
        </MKTypography>
      </MKBox>
      <MKBox display="flex" justifyContent="space-between" p={1.5}>
        <MKButton ariant="gradient" color="info" onClick={onCloseModal}>
          Xác nhận
        </MKButton>
      </MKBox>
    </MKBox>
  </Modal>
  </Container>
  </MKBox>
  </Box>
  );
};

export default QuestionDetail;
