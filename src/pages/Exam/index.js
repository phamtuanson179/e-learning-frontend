import {
  Box,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  Modal,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MENUBAR } from "./constant";
import QuestionNavbar from "./QuestionNavbar.js";
import "./exam.scss";
import QuestionDetail from "./QuestionDetail.js";
import examAPI from "api/examAPI";
import { STATUS } from "./constant";
import { SettingsCellRounded } from "@mui/icons-material";
import Countdown from "react-countdown";

const convertDatas = (datas) => {
  const result = datas?.map((data, idx) => {
    return {
      ...data,
      idx: idx,
      status: STATUS.NORESPONSE,
      curAnswer: -1,
    };
  });
  return result;
};

const Exam = () => {
  const [questions, setQuestions] = useState();
  const [questionAmount, setQuestionAmount] = useState(0);
  const [curQuestion, setCurQuestion] = useState("");
  const [curIndexQuestion, setCurIndexQuestion] = useState(0);
  const [time, setTime] = useState(30);
  const [nameTest, setNameTest] = useState("");
  const [duration, setDuration] = useState();
  const [minPointToPass, setMinPointToPass] = useState();
  const [startCountDown, setStartCountDown] = useState(false);
  const [loading, setLoading] = useState(true);

  const getExam = async (id) => {
    try {
      const params = {
        id: id,
      };
      await examAPI.getExam(params).then((res) => {
        console.log({ res });
        const result = convertDatas(res?.data.questions);
        console.log({ result });
        setNameTest(res?.name);
        setDuration(res?.duration);
        setMinPointToPass(res?.min_point_to_pass);
        setQuestions(result);
        setQuestionAmount(result?.length);
        setCurQuestion(result[0]);
        setLoading(false);
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const searchQuestionByIdx = (id, questions) => {
    if (questions) {
      for (let question of questions) {
        if (question?.idx == id) {
          setCurQuestion(question);
          break;
        }
      }
    }
  };

  // ham luu lai cau tra loi moi khi nguoi dung chon cau tra loi khac
  const saveAnswerOfQuestion = (question, listQuestions) => {
    if (questions) {
      let curQuestions = [...listQuestions];
      curQuestions[question.idx] = question;
      setQuestions(curQuestions);
    }
  };

  // call API
  useEffect(() => {
    getExam("TEL1645826061.724958");
    // startCountDown(countDown);
  }, []);

  // tim cau hoi voi moi lua chon so cau
  useEffect(() => {
    searchQuestionByIdx(curIndexQuestion, questions);
  }, [curIndexQuestion]);

  //thay doi cau tra loi moi khi nguoi dung chon cau tra loi khac
  useEffect(() => {
    saveAnswerOfQuestion(curQuestion, questions);
  }, [curQuestion]);

  return (
    <Box className='exam__container'>
      <Box className='exam__container--left'>
        <QuestionNavbar
          questionAmount={questionAmount}
          setCurIndexQuestion={setCurIndexQuestion}
          curIndexQuestion={curIndexQuestion}
          curQuestion={curQuestion}
          questions={questions}
        />
      </Box>
      <Box className='exam__container--right'>
        <QuestionDetail
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
          nameTest={nameTest}
          startCountDown={startCountDown}
          setStartCountDown={setStartCountDown}
          loading={loading}
          questions={questions}
          duration={duration}
          minPointToPass={minPointToPass}
          questionAmount={questionAmount}
        />
      </Box>
    </Box>
  );
};

export default Exam;
