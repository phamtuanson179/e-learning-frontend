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
} from "@mui/material";
import infoAPI from "api/infoAPI";
import { STATUS } from "./constant";
import Countdown from "react-countdown";

const QuestionDetail = ({
  curQuestion,
  setCurQuestion,
  nameTest,
  startCountDown,
  setStartCountDown,
}) => {
  // const curQuestionAnswer = curQuestion.curAnswer;

  const progressWhenChangeAnswer = (answer, question) => {
    let curQuestion = JSON.parse(JSON.stringify(question));
    curQuestion.curAnswer = parseInt(answer);
    console.log(typeof curQuestion.curAnswer);
    if (curQuestion?.curAnswer !== -1) {
      const indexAnswerCorrect = curQuestion?.answers?.findIndex(
        (answer) => answer?.is_correct == true
      );
      console.log({ indexAnswerCorrect });
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
          value={curQuestion.curAnswer ? curQuestion.curAnswer : ""}
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
  // const renderer = ({ hours, minutes, seconds, completed, api }) => {
  //   console.log({ api });
  //   if (curQuestion) {
  //     api.start();
  //     set
  //   }
  //   if (completed) {
  //     // Render a completed state
  //     return;
  //   } else {
  //     // Render a countdown
  //     return (
  //       <span>
  //         {hours}:{minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };

  return (
    <>
      <Box>
        {/* {startCountDown ? <Countdown date={Date.now() + 10000} /> : <></>} */}
        {/* <Countdown
          date={Date.now() + 30000}
          autoStart={false}
          renderer={renderer}
        /> */}
        <Box className='detail__exam'>
          <Typography component={"p"}>{nameTest}</Typography>
        </Box>
        <Typography
          component={"p"}
          className='title__question'
          sx={{
            marginBottom: "32px",
          }}
        >
          {curQuestion.content}
        </Typography>
        <Box className='answer__container'>
          {renderAnwserQuestion(curQuestion.answers)}
        </Box>
      </Box>
    </>
  );
};

export default QuestionDetail;
