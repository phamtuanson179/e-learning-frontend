import { useEffect, useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal
} from "@mui/material";
import infoAPI from "api/infoAPI";
import { STATUS } from "./constant";
import Countdown from "react-countdown";
import { display } from "@mui/system";
import { internal_resolveProps } from "@mui/utils";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
  const [userPoint, setUserPoint] = useState(0)
  const [showModalResult, setShowModalResult] = useState(false);

  useEffect(() => {
    setValueRadio(curQuestion?.curAnswer + 1 ? curQuestion?.curAnswer : -1)
  }, [curQuestion])

  const onCloseModal = () => {
    setShowModalResult(false)
  }

  const progressWhenChangeAnswer = (answer, question) => {
    let curQuestion = JSON.parse(JSON.stringify(question));
    curQuestion.curAnswer = parseInt(answer);
    console.log(curQuestion.curAnswer)
    if (curQuestion?.curAnswer !== -1) {
      const indexAnswerCorrect = curQuestion?.answers?.findIndex(
        (answer) => answer?.is_correct == true
      );
      console.log({ indexAnswerCorrect })
      if (curQuestion?.curAnswer === indexAnswerCorrect) {
        curQuestion.status = STATUS.CORRECT;
      } else {
        curQuestion.status = STATUS.INCORRECT;
      }
      console.log({ curQuestion })
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


  const [countDown, setCountDown] = useState(10000);
  const [time, setTime] = useState('00:00')

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

  // useEffect(() => {
  //   if (curQuestion)
  //     progressWhenChangeAnswer()
  // }, [valueRadio])


  const excutePointOfExam = () => {
    let result = 0;
    for (let question of questions) {
      if (question.status === STATUS.CORRECT) {
        result += duration
      }
    }
    return result
  }

  // useEffect(() => {
  //   if (showModalResult) {
  //     excutePointOfExam()
  //   }
  // }, [showModalResult])

  return (
    <Box>
      <Box className='detail__exam' >
        <Typography component={"div"} variant='subtitle1' className="name__test">{nameTest}</Typography>
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
      <Modal
        open={showModalResult}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Điểm của bạn là
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {showModalResult ? `${excutePointOfExam()}/${duration * questionAmount}` : ''}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default QuestionDetail;
