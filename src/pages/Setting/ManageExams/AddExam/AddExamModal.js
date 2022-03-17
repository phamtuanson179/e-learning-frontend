import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import examAPI from "api/examAPI";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { transform } from "lodash";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import "./AddExamModal.scss";
import AddQuestionModal from "./AddQuestionModal";

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

const initExam = {
  name: "",
  minCorrectAnswers: null,
  duration: null,
  require_rooms: ["AI"],
  questions: [],
};

const yupSchema = yup.object().shape({
  name: yup.string().required("Trường này bắt buộc!"),
  duration: yup
    .number()
    .required("Trường này bắt buộc")
    .integer("Cần nhập số nguyên!")
    .min(0, "Cần nhập số nguyên dương"),
  minCorrectAnswers: yup
    .number()
    .required("Trường này bắt buộc")
    .integer("Cần nhập số nguyên!")
    .min(0, "Cần nhập số nguyên dương"),
  requireRoom: yup.string().required("Trường này bắt buộc!"),
});

const AddExamModal = ({ setLoadingAgain, loadingAgain }) => {
  const [isOpenAddExamModal, setIsOpenAddExamModal] = useState(false);
  const [exam, setExam] = useState(initExam);
  const [questionList, setQuestionList] = useState([]);

  const handleCloseAddExamModal = () => {
    setIsOpenAddExamModal(false);
  };

  const handleOpenAddExamModal = () => {
    setIsOpenAddExamModal(true);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupSchema) });

  useEffect(() => {
    console.log({ questionList });
    setExam({
      ...exam,
      questions: questionList,
    });
  }, [questionList]);

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

  const handleDeleteQuestion = (question) => {
    const newQuestionList = questionList.filter((item) => item != question);
    setQuestionList(newQuestionList);
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
            <Box sx={{ textAlign: "right" }}>
              <Button
                onClick={() => handleDeleteQuestion(question)}
                size='small'
              >
                <Typography variant='body2' fontSize={12} fontWeight='500'>
                  Xóa câu hỏi
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      );
    });
    return result;
  };

  const onSubmit = async (data) => {
    console.log({ data });
    const convertQuestionList = questionList.map((question) => {
      const convertQuestion = {
        content: question.content,
        type: 1,
        url_file: "",
        answers: question.answers,
      };
      return convertQuestion;
    });

    const convertData = (data) => {
      return {
        name: data.name,
        min_point_to_pass: data.minCorrectAnswers * 10,
        duration: data.duration,
        require_rooms: [data.requireRoom],
        created_by: localStorage.getItem("email"),
        questions: convertQuestionList,
      };
    };
    const newData = convertData(data);

    await examAPI.addExamByAdmin(newData).then(() => {
      setLoadingAgain(true);
      setIsOpenAddExamModal(false);
      reset();
      setQuestionList([]);
    });
  };
  return (
    <Box sx={{ marginBottom: 2 }}>
      {/* <Button onClick={handleOpenAddExamModal}>Thêm bài thi</Button> */}
      <Grid container item xs={12} lg={10} justifyContent='center' mx='auto'>
        <MKButton
          variant='gradient'
          color='info'
          onClick={handleOpenAddExamModal}
        >
          Thêm bài thi
        </MKButton>
      </Grid>
      <Box>
        <Modal
          sx={{
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={isOpenAddExamModal}
          onClose={handleCloseAddExamModal}
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
                Thêm bài thi
              </Typography>
              <CloseIcon
                fontSize='medium'
                sx={{ cursor: "pointer" }}
                onClick={handleCloseAddExamModal}
              />
            </Box>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)} id='form-add-exam'>
              <Box sx={{ margin: 2, marginTop: 0, marginBottom: 0 }}>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{
                          width: "100%",
                          marginBottom: 2,
                        }}
                        size='normal'
                        variant='standard'
                        label='Tên bài thi'
                        helperText={errors?.name?.message}
                        {...field}
                      />
                    );
                  }}
                />

                <Controller
                  name='duration'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='standard'
                        helperText={errors?.duration?.message}
                        label='Thời gian'
                        {...field}
                      />
                    );
                  }}
                />

                <Controller
                  name='minCorrectAnswers'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='standard'
                        helperText={errors?.minCorrectAnswers?.message}
                        label='Số câu đúng tối thiểu'
                        {...field}
                      />
                    );
                  }}
                />

                <Controller
                  name='requireRoom'
                  control={control}
                  defaultValue='AI'
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='standard'
                        helperText={errors?.requireRoom?.message}
                        label='Thuộc phòng'
                        {...field}
                      />
                    );
                  }}
                />
              </Box>
              <Box
                className='questions__section'
                sx={{ maxHeight: "50vh", overflowY: "scroll", marginBottom: 2 }}
              >
                {renderQuestions(questionList)}
              </Box>
            </form>
            <AddQuestionModal
              setQuestionList={setQuestionList}
              questionList={questionList}
            />
            <Box display='flex' justifyContent='right' sx={{ margin: 2 }}>
              <MKButton
                variant='gradient'
                color='dark'
                onClick={handleCloseAddExamModal}
                sx={{ marginRight: 2 }}
              >
                Đóng
              </MKButton>
              <MKButton type='submit' color='info' form='form-add-exam'>
                Lưu
              </MKButton>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default AddExamModal;
