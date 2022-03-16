import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import { padding } from "@mui/system";
import { useEffect, useState } from "react";
import { STATUS } from "./constant";
import ResultModal from "./ResultModal";

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
        result += 10
      }
    }
    return result
  }

  return (
    <Box >
      <Box className='detail__exam' >
        <Typography component={"div"} variant='subtitle1' className="name__test">{nameTest ? nameTest : ''}</Typography>
        <Typography component={"div"} variant='subtitle1' className="countdown__oclock">Thời gian: {time}</Typography>
        {/* <Button className="btn__submit" onClick={onSubmitExam}>Nộp bài</Button> */}
        <ResultModal />

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
    </Box>
  );
};

export default QuestionDetail;
