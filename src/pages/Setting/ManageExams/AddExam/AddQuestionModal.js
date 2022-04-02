import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MKButton from "components/MKButton";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";
import { TYPEQUESTION } from "constants/typeQuestion";

const style = {
  bgcolor: "background.paper",
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "348px",
  flexDirection: "column",
  borderRadius: "12px",
  bgColor: "white",
  border: "1px solid #0000003d",
};

const yupSchema = yup.object().shape({
  content: yup.string().required("Trường này bắt buộc!"),
  ans0: yup.string().required("Trường này bắt buộc!"),
  ans1: yup.string().required("Trường này bắt buộc!"),
  ans2: yup.string().required("Trường này bắt buộc!"),
  ans3: yup.string().required("Trường này bắt buộc!"),
  correctAnswerIndex: yup.string().required("Cần chọn một câu trả lời đúng!"),
  correctAnswerListOfForm: yup
    .array()
    .min(2, "Cần chọn ít nhất hai câu trả lời đúng"),
  //   .min(2, "Cần chọn ít nhất hai câu trả lời đúng!"),
});

const AddQuestionModal = ({ setQuestionList, questionList }) => {
  const [isOpenAddQuestionModal, setIsOpenAddQuestionModal] = useState(false);
  // const [question, setQuestion] = useState('')
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [openNoti, setOpenNoti] = useState(false);
  const [typeQuestion, setTypeQuestion] = useState(
    TYPEQUESTION.ONE_CORRECT_ANSWER
  );
  const [correctAnswerList, setCorrectAnswerList] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [autoFocus, setAutoFocus] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ resolver: yupResolver(yupSchema) });

  useEffect(() => {
    if (typeQuestion === TYPEQUESTION.TRUE_FALSE_ANSWERS) {
      setValue("ans0", "Đúng");
      setValue("ans1", "Sai");
      setValue("ans2", "Nothing");
      setValue("ans3", "Nothing");
      setValue("correctAnswerListOfForm", Array(4).fill(false));
    } else if (typeQuestion === TYPEQUESTION.MANY_CORRECT_ANSWERS) {
      setValue("ans0", "");
      setValue("ans1", "");
      setValue("ans2", "");
      setValue("ans3", "");
      setValue("correctAnswerListOfForm", []);
      setValue("correctAnswerIndex", "Nothing");
    } else if (typeQuestion === TYPEQUESTION.ONE_CORRECT_ANSWER) {
      setValue("ans0", "");
      setValue("ans1", "");
      setValue("ans2", "");
      setValue("ans3", "");
      setValue("correctAnswerListOfForm", Array(4).fill(false));
    }
  }, [typeQuestion]);

  const onChangeCheckbox = (idx) => {
    let datas = [...correctAnswerList];
    datas[idx] = !datas[idx];
    setCorrectAnswerList(datas);
    setValue(
      "correctAnswerListOfForm",
      datas.map((data, idx) => {
        if (data === true) return true;
        else return false;
      })
    );
  };

  const handleCloseAddQuestionModal = () => {
    setIsOpenAddQuestionModal(false);
  };

  const handleOpenAddQuestionModal = () => {
    setIsOpenAddQuestionModal(true);
  };

  const renderAnswerTypeOneCorrectAnswer = () => {
    return (
      <>
        <Controller
          control={control}
          name='correctAnswerIndex'
          render={({ field }) => {
            return (
              <RadioGroup {...field}>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value='0'
                    control={<Radio />}
                    label=''
                    sx={{ width: 32, height: 32, padding: 0 }}
                  />
                  <Controller
                    name='ans0'
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          id='standard-basic'
                          label='Câu trả lời thứ nhất'
                          sx={{ width: "100%" }}
                          helperText={
                            <Typography variant='caption' color='error'>
                              {" "}
                              {errors.ans0?.message}
                            </Typography>
                          }
                          variant='standard'
                          {...field}
                        />
                      );
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value='1'
                    control={<Radio />}
                    label=''
                    sx={{ width: 32, height: 32, padding: 0 }}
                  />
                  <Controller
                    name='ans1'
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          id='standard-basic'
                          label='Câu trả lời thứ hai'
                          helperText={
                            <Typography variant='caption' color='error'>
                              {" "}
                              {errors.ans1?.message}
                            </Typography>
                          }
                          sx={{ width: "100%" }}
                          variant='standard'
                          {...field}
                        />
                      );
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value='2'
                    control={<Radio />}
                    label=''
                    sx={{ width: 32, height: 32, padding: 0 }}
                  />
                  <Controller
                    name='ans2'
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          id='standard-basic'
                          label='Câu trả lời thứ ba'
                          helperText={
                            <Typography variant='caption' color='error'>
                              {" "}
                              {errors.ans2?.message}
                            </Typography>
                          }
                          sx={{ width: "100%" }}
                          variant='standard'
                          {...field}
                        />
                      );
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value='3'
                    control={<Radio />}
                    label=''
                    sx={{ width: 32, height: 32, padding: 0 }}
                  />
                  <Controller
                    name='ans3'
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          id='standard-basic'
                          label='Câu trả lời thứ tư'
                          helperText={
                            <Typography variant='caption' color='error'>
                              {" "}
                              {errors.ans3?.message}
                            </Typography>
                          }
                          sx={{ width: "100%" }}
                          variant='standard'
                          {...field}
                        />
                      );
                    }}
                  />
                </Box>
              </RadioGroup>
            );
          }}
        />
        <Typography variant='caption' color='error'>
          {errors.correctAnswerIndex?.message}
        </Typography>
      </>
    );
  };

  const renderAnswerTypeTrueFalseAnswer = () => {
    return (
      <>
        <Controller
          control={control}
          name='correctAnswerIndex'
          render={({ field }) => {
            return (
              <RadioGroup {...field}>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value='0'
                    control={<Radio />}
                    label='Đúng'
                    sx={{ padding: 0 }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value='1'
                    control={<Radio />}
                    label='Sai'
                    sx={{ padding: 0 }}
                  />
                </Box>
              </RadioGroup>
            );
          }}
        />
        <Typography variant='caption' color='error'>
          {errors.correctAnswerIndex?.message}
        </Typography>
      </>
    );
  };

  const renderAnswerTypeManyCorrectAnswer = () => {
    return (
      <Box className='answer-type-many-correct-answer__section'>
        {/* <Controller
          control={control}
          name='correctAnswerIndex'
          render={({ field }) => {
            return ( */}
        <FormGroup>
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
              width: "100%",
            }}
            control={
              <Checkbox
                checked={correctAnswerList[0]}
                onChange={() => {
                  onChangeCheckbox(0);
                }}
              />
            }
            label={
              <Controller
                name='ans0'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ nhất'
                      helperText={
                        <Typography variant='caption' color='error'>
                          {errors.ans0?.message}
                        </Typography>
                      }
                      sx={{ width: "100%", marginBottom: 1, flex: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
            }}
            control={
              <Checkbox
                checked={correctAnswerList[1]}
                onChange={() => {
                  onChangeCheckbox(1);
                }}
              />
            }
            label={
              <Controller
                name='ans1'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ hai'
                      helperText={
                        <Typography variant='caption' color='error'>
                          {errors.ans1?.message}
                        </Typography>
                      }
                      sx={{ width: "100%", marginBottom: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
            }}
            control={
              <Checkbox
                checked={correctAnswerList[2]}
                onChange={() => {
                  onChangeCheckbox(2);
                }}
              />
            }
            label={
              <Controller
                name='ans2'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ ba'
                      helperText={
                        <Typography variant='caption' color='error'>
                          {errors.ans2?.message}
                        </Typography>
                      }
                      sx={{ width: "100%", marginBottom: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
            }}
            control={
              <Checkbox
                checked={correctAnswerList[3]}
                onChange={() => {
                  onChangeCheckbox(3);
                }}
              />
            }
            label={
              <Controller
                name='ans3'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ tư'
                      helperText={
                        <Typography variant='caption' color='error'>
                          {errors.ans3?.message}
                        </Typography>
                      }
                      sx={{ width: "100%", marginBottom: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
        </FormGroup>
        {/* );
          }}
        /> */}
        <Typography variant='caption' color='error'>
          {errors.correctAnswerListOfForm?.message}
        </Typography>
      </Box>
    );
  };

  const renderAnswer = () => {
    if (typeQuestion === TYPEQUESTION.ONE_CORRECT_ANSWER) {
      return renderAnswerTypeOneCorrectAnswer();
    } else if (typeQuestion === TYPEQUESTION.TRUE_FALSE_ANSWERS) {
      return renderAnswerTypeTrueFalseAnswer();
    } else if (typeQuestion === TYPEQUESTION.MANY_CORRECT_ANSWERS) {
      return renderAnswerTypeManyCorrectAnswer();
    }
  };

  const handleAnwsers = (answerList) => {
    const correctAnswerIndex = getValues("correctAnswerIndex");
    let answers = [];
    for (let i = 0; i < answerList.length; i++) {
      let answer = {
        content: answerList[i],
        is_correct: false,
        url_file: null,
      };
      if (typeQuestion === TYPEQUESTION.ONE_CORRECT_ANSWER) {
        if (correctAnswerIndex == i) {
          answer.is_correct = true;
        }
        answers.push(answer);
      } else if (typeQuestion === TYPEQUESTION.MANY_CORRECT_ANSWERS) {
        if (correctAnswerList[i] === true) {
          answer.is_correct = true;
        }
        answers.push(answer);
      } else if (typeQuestion === TYPEQUESTION.TRUE_FALSE_ANSWERS) {
        if (i < 2) {
          if (correctAnswerIndex == i) {
            answer.is_correct = true;
          }
          answers.push(answer);
        } else break;
      }
    }
    return answers;
  };

  const handleChangeTypeQuestion = (event) => {
    setTypeQuestion(event.target.value);
  };

  const onSubmit = async (data) => {
    console.log({ data });
    const newQuestion = {
      content: data.content,
      type: typeQuestion,
      url_file: "",
      correctAnswerIndex: data.correctAnswerIndex,
      correctAnswerList: data.correctAnswerListOfForm,
      answers: handleAnwsers([data.ans0, data.ans1, data.ans2, data.ans3]),
    };
    console.log({ questionList });
    setQuestionList([...questionList, newQuestion]);
    setNotification({
      message: "Thêm câu hỏi thành công!",
      type: NOTIFICATION.SUCCESS,
    });
    setOpenNoti(true);
    setIsOpenAddQuestionModal(false);
    reset({});
    setCorrectAnswerList(Array(4).fill(false));
  };
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <MKButton
          onClick={handleOpenAddQuestionModal}
          sx={{ border: "2px solid #1A73E8", color: "#1A73E8" }}
        >
          Thêm câu hỏi
        </MKButton>
      </Box>

      <Modal
        hideBackdrop
        open={isOpenAddQuestionModal}
        onClose={handleCloseAddQuestionModal}
        sx={{
          display: "flex",
          alignItems: "Center",
        }}
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
              Thêm câu hỏi
            </Typography>
            <CloseIcon
              fontSize='medium'
              sx={{ cursor: "pointer" }}
              onClick={handleCloseAddQuestionModal}
            />
          </Box>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ margin: 2 }}>
              {" "}
              <FormControl variant='standard' fullWidth>
                <InputLabel id='type-question'>Loại câu hỏi</InputLabel>
                <Select
                  labelId='type-question'
                  id='type-question'
                  value={typeQuestion}
                  label='Loại câu hỏi'
                  onChange={handleChangeTypeQuestion}
                  sx={{ height: 30 }}
                >
                  <MenuItem value={TYPEQUESTION.ONE_CORRECT_ANSWER}>
                    Câu hỏi có một đáp án
                  </MenuItem>
                  <MenuItem value={TYPEQUESTION.TRUE_FALSE_ANSWERS}>
                    Câu hỏi đúng sai
                  </MenuItem>
                  <MenuItem value={TYPEQUESTION.MANY_CORRECT_ANSWERS}>
                    Câu hỏi có nhiều đáp án
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ margin: 2 }}>
              <Controller
                name='content'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu hỏi'
                      sx={{ width: "100%", marginBottom: 3 }}
                      variant='standard'
                      helperText={
                        <Typography variant='caption' color='error'>
                          {errors.content?.message}
                        </Typography>
                      }
                      {...field}
                    />
                  );
                }}
              />
              {/* <Controller
                control={control}
                name='correctAnswerIndex'
                render={({ field }) => {
                  return (
                    <RadioGroup {...field}>
                      <Box
                        sx={{
                          display: "flex",
                          marginBottom: 1,
                          alignItems: "center",
                        }}
                      >
                        <FormControlLabel
                          value='0'
                          control={<Radio />}
                          label=''
                          sx={{ width: 32, height: 32, padding: 0 }}
                        />
                        <Controller
                          name='ans0'
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextField
                                id='standard-basic'
                                label='Câu trả lời thứ nhất'
                                sx={{ width: "100%" }}
                                helperText={
                                  <Typography variant='caption' color='error'>
                                    {" "}
                                    {errors.ans0?.message}
                                  </Typography>
                                }
                                variant='standard'
                                {...field}
                              />
                            );
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          marginBottom: 1,
                          alignItems: "center",
                        }}
                      >
                        <FormControlLabel
                          value='1'
                          control={<Radio />}
                          label=''
                          sx={{ width: 32, height: 32, padding: 0 }}
                        />
                        <Controller
                          name='ans1'
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextField
                                id='standard-basic'
                                label='Câu trả lời thứ hai'
                                helperText={
                                  <Typography variant='caption' color='error'>
                                    {" "}
                                    {errors.ans1?.message}
                                  </Typography>
                                }
                                sx={{ width: "100%" }}
                                variant='standard'
                                {...field}
                              />
                            );
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          marginBottom: 1,
                          alignItems: "center",
                        }}
                      >
                        <FormControlLabel
                          value='2'
                          control={<Radio />}
                          label=''
                          sx={{ width: 32, height: 32, padding: 0 }}
                        />
                        <Controller
                          name='ans2'
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextField
                                id='standard-basic'
                                label='Câu trả lời thứ ba'
                                helperText={
                                  <Typography variant='caption' color='error'>
                                    {" "}
                                    {errors.ans2?.message}
                                  </Typography>
                                }
                                sx={{ width: "100%" }}
                                variant='standard'
                                {...field}
                              />
                            );
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          marginBottom: 1,
                          alignItems: "center",
                        }}
                      >
                        <FormControlLabel
                          value='3'
                          control={<Radio />}
                          label=''
                          sx={{ width: 32, height: 32, padding: 0 }}
                        />
                        <Controller
                          name='ans3'
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextField
                                id='standard-basic'
                                label='Câu trả lời thứ tư'
                                helperText={
                                  <Typography variant='caption' color='error'>
                                    {" "}
                                    {errors.ans3?.message}
                                  </Typography>
                                }
                                sx={{ width: "100%" }}
                                variant='standard'
                                {...field}
                              />
                            );
                          }}
                        />
                      </Box>
                    </RadioGroup>
                  );
                }}
              /> */}
              {renderAnswer()}
              <Typography variant='caption' color='error'>
                {errors.correctAnswerIndex?.message}
              </Typography>
            </Box>
            <Box display='flex' justifyContent='right' sx={{ margin: 2 }}>
              <MKButton
                variant='gradient'
                color='dark'
                onClick={handleCloseAddQuestionModal}
                sx={{ marginRight: 2 }}
              >
                Đóng
              </MKButton>
              <MKButton type='submit' color='info'>
                Lưu
              </MKButton>
            </Box>
          </form>
        </Box>
      </Modal>
      <TPNotification
        type={notification.type}
        message={notification.message}
        open={openNoti}
        setOpen={setOpenNoti}
      />
    </>
  );
};

export default AddQuestionModal;
