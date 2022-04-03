import { Box, CircularProgress } from "@mui/material";
import examAPI from "api/examAPI";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { STATUS } from "./constant";
import "./exam.scss";
import QuestionDetail from "./QuestionDetail";
import QuestionNavbar from "./QuestionNavbar";

const convertDatas = (datas) => {
  const result = datas?.map((data, idx) => {
    return {
      ...data,
      idx: idx,
      status: STATUS.NORESPONSE,
      curAnswer: -1,
      curAnswerList: Array(4).fill(false),
    };
  });
  return result;
};

const Exam = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState();
  const [questionAmount, setQuestionAmount] = useState(0);
  const [curQuestion, setCurQuestion] = useState("");
  const [curIndexQuestion, setCurIndexQuestion] = useState(0);
  const [nameTest, setNameTest] = useState("");
  const [duration, setDuration] = useState();
  const [minPointToPass, setMinPointToPass] = useState();
  const [startCountDown, setStartCountDown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [idExam, setIdExam] = useState("");
  const [exam, setExam] = useState();
  const [curQuestionType, setCurQuestionType] = useState();
  const searchQuestionByIdx = (id, questions) => {
    if (questions) {
      for (let question of questions) {
        if (question?.idx == id) {
          setCurQuestion(question);
          setCurQuestionType(question?.type);
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
    // getExam(location?.state?.exam);
    const exam = location.state?.exam;
    setExam(exam);
    const questions = convertDatas(exam.questions);
    setNameTest(exam?.name);
    setDuration(exam?.duration);
    setMinPointToPass(exam?.min_point_to_pass);
    setQuestions(questions);
    setQuestionAmount(questions.length);
    setCurQuestion(questions[0]);
    setIdExam(exam?.id);
    setLoading(false);
    // startCountDown(countDown);
  }, []);

  // tim cau hoi voi moi lua chon so cau
  useEffect(() => {
    saveAnswerOfQuestion(curQuestion, questions);
    searchQuestionByIdx(curIndexQuestion, questions);
  }, [curIndexQuestion]);

  //thay doi cau tra loi moi khi nguoi dung chon cau tra loi khac
  // useEffect(() => {}, [curQuestion]);

  return (
    <Box className='exam__container'>
      <Box className='exam__container--left'>
        {loading ? (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <QuestionNavbar
            questionAmount={questionAmount}
            setCurIndexQuestion={setCurIndexQuestion}
            curIndexQuestion={curIndexQuestion}
            curQuestion={curQuestion}
            questions={questions}
            loading={loading}
          />
        )}
      </Box>
      <Box className='exam__container--right' sx={{ height: "100%" }}>
        {loading ? (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
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
            exam={exam}
            curQuestionType={curQuestionType}
          />
        )}
      </Box>
    </Box>
  );
};

export default Exam;
