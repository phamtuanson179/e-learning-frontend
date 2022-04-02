import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { STATUS } from "../constant";
import ResultModal from "../ResultModal";
import { convertSecondToTime } from "../../../utils/convert";
import { QUESTION_TYPE } from "constants/questionType";

const QuestionDetail = ({
  curQuestion,
  setCurQuestion,
  nameTest,
  questions,
  duration,
  minPointToPass,
  questionAmount,
  exam,
  loading,
  curQuestionType,
}) => {
  console.log({ curQuestion });
  const [valueRadio, setValueRadio] = useState(-1);
  const [showModalResult, setShowModalResult] = useState(false);
  const [countDown, setCountDown] = useState(duration);
  const [time, setTime] = useState("00:00");
  const [isFinish, setIsFinish] = useState(false);
  const [statusCheckboxList, setStatusCheckboxList] = useState(
    Array(4).fill(false)
  );
  useEffect(() => {
    setValueRadio(curQuestion?.curAnswer + 1 ? curQuestion?.curAnswer : -1);
    setStatusCheckboxList(Array(4).fill(false));
  }, [curQuestion]);

  useEffect(() => {
    if (!isFinish) {
      if (curQuestion) {
        if (countDown < 0) {
          setTime("00:00");
          setIsFinish(true);
          setShowModalResult(true);
        } else {
          setTimeout(() => {
            setCountDown(countDown - 1);
            const time = convertSecondToTime(countDown);
            setTime(`${time.minutes}:${time.seconds}`);
          }, 1000);
          return;
        }
      }
    }
  }, [countDown, loading]);

  const compareArray = (arrA, arrB) => {
    let isEqual = true;
    if (arrA.length == arrB.length) {
      const lengthArr = arrA.length;
      for (let i = 0; i < lengthArr; i++) {
        if (arrA[i] != arrB[i]) {
          isEqual = false;
          return isEqual;
        }
      }
    }
    return isEqual;
  };

  const progressWhenChangeAnswer = (answer, question) => {
    let curQuestion = JSON.parse(JSON.stringify(question));
    if (
      curQuestionType === QUESTION_TYPE.ONE_CORRECT_ANSWER ||
      curQuestionType === QUESTION_TYPE.TRUE_FALSE_ANSWERS
    ) {
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
    } else if (curQuestionType === QUESTION_TYPE.MANY_CORRECT_ANSWERS) {
      console.log({ answer });
      curQuestion.curAnswerList = answer;
      if (compareArray(answer, Array(4).fill(false)))
        curQuestion.status = STATUS.NORESPONSE;
      const correctAnswer = curQuestion.answers.map((ans, idx) =>
        ans?.is_correct === true ? true : false
      );
      if (compareArray(correctAnswer, answer)) {
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
  const onChangeCheckbox = (e, idx) => {
    console.log({ idx });
    let datas = [...statusCheckboxList];
    datas[idx] = !datas[idx];
    console.log(datas);
    setStatusCheckboxList(datas);
    progressWhenChangeAnswer(datas, curQuestion);
  };

  const renderAnwserQuestion = (listAnswers, questionType) => {
    console.log({ listAnswers });
    if (
      curQuestionType === QUESTION_TYPE.ONE_CORRECT_ANSWER ||
      curQuestionType === QUESTION_TYPE.TRUE_FALSE_ANSWERS
    ) {
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
    } else if (curQuestionType === QUESTION_TYPE.MANY_CORRECT_ANSWERS) {
      return (
        <FormGroup>
          {listAnswers.map((answer, idx) => (
            <FormControlLabel
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: 0,
                marginBottom: 0,
              }}
              control={
                <Checkbox
                  size='small'
                  checked={statusCheckboxList[idx]}
                  onChange={(e) => {
                    onChangeCheckbox(e, idx);
                  }}
                />
              }
              label={
                <Typography
                  sx={{ display: "inline" }}
                  variant='body2'
                  fontWeight={400}
                >
                  {answer.content}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      );
    }
  };

  const onClickClearAnswer = (question) => {
    let curQuestion = JSON.parse(JSON.stringify(question));
    curQuestion.status = STATUS.NORESPONSE;
    curQuestion.curAnswer = -1;
    setCurQuestion(curQuestion);
  };

  const onSubmitExam = () => {
    setShowModalResult(true);
  };

  return (
    <Box>
      <Box className='detail__exam'>
        <Typography component={"div"} variant='h5' className='name__test'>
          {nameTest ? nameTest : ""}
        </Typography>
        <Typography
          component={"div"}
          variant='h5'
          className='countdown__oclock'
        >
          Thời gian: {time}
        </Typography>
        <ResultModal
          showModalResult={showModalResult}
          setShowModalResult={setShowModalResult}
          questions={questions}
          questionAmount={questionAmount}
          minPointToPass={minPointToPass}
          isFinish={isFinish}
          setIsFinish={setIsFinish}
          exam={exam}
          countDown={countDown}
          duration={duration}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component={"div"} className='title__question' variant='h5'>
          {curQuestion.content}
        </Typography>
        <Button onClick={() => onClickClearAnswer(curQuestion)}>
          Xoá lựa chọn
        </Button>
      </Box>

      <Box className='answer__container'>
        {renderAnwserQuestion(curQuestion.answers, curQuestion.type)}
      </Box>
    </Box>
  );
};

export default QuestionDetail;
