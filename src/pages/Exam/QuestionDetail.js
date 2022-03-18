import {
  Box,
  Button, FormControl,
  FormControlLabel, Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { STATUS } from "./constant";
import ResultModal from "./ResultModal";
import { convertSecondToTime } from '../../utils/convert';

const QuestionDetail = ({
  curQuestion,
  setCurQuestion,
  nameTest,
  questions,
  duration,
  minPointToPass,
  questionAmount,
  idExam,
  loading
}) => {

  const [valueRadio, setValueRadio] = useState(-1)
  const [showModalResult, setShowModalResult] = useState(false);
  const [countDown, setCountDown] = useState(duration);
  const [time, setTime] = useState('00:00');
  const [isFinish, setIsFinish] = useState(false);
  useEffect(() => {
    setValueRadio(curQuestion?.curAnswer + 1 ? curQuestion?.curAnswer : -1)
  }, [curQuestion])

  useEffect(() => {
    if (!isFinish) {
      if (curQuestion) {
        if (countDown < 0) {
          setTime('00:00')
          setIsFinish(true)
          setShowModalResult(true)
        }
        else {
          setTimeout(() => {
            setCountDown(countDown - 1)
            const time = convertSecondToTime(countDown)
            setTime(`${time.minutes}:${time.seconds}`)
          }, 1000)
          return
        }
      }
    }
  }, [countDown, loading])


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
        <ResultModal
          showModalResult={showModalResult}
          setShowModalResult={setShowModalResult}
          questions={questions}
          questionAmount={questionAmount}
          minPointToPass={minPointToPass}
          isFinish={isFinish}
          setIsFinish={setIsFinish}
          idExam={idExam}
          countDown={countDown}
          duration={duration}
        />
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
