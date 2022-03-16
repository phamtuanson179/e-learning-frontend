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
import ResultModal from "./ResultModal";
import { useNavigate } from "react-router-dom";


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



  return (
    <Box >
      <Box className='detail__exam' >
        <Typography component={"div"} variant='h5' className="name__test">{nameTest ? nameTest : ''}</Typography>
        <Typography component={"div"} variant='h5' className="countdown__oclock">Thời gian: {time}</Typography>
        {/* <Button className="btn__submit" onClick={onSubmitExam}>Nộp bài</Button> */}
        <ResultModal showModalResult={showModalResult} setShowModalResult={setShowModalResult} questions={questions} questionAmount={questionAmount} minPointToPass={minPointToPass} />

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
