import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Progress } from "antd";
import examAPI from "api/examAPI";
import { useEffect, useState } from "react";
import "./HistoryExams.scss";
import TableHistoryExam from "./TableHistoryExam";
import { isEmpty } from "lodash";
import { convertSecondToTime } from "utils/convert";

const LastestResult = ({ lastestResultExam }) => {
  const caculatePercentResult = (point, maxPoint) => {
    return (point / maxPoint) * 100;
  };

  const showTime = (duration) => {
    const time = convertSecondToTime(duration);
    return `${time.minutes}:${time.seconds}`;
  };

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 4,
          marginRight: 1,
        }}
        className='lastest__result'
      >
        <Typography
          variant='h5'
          component={"div"}
          sx={{ marginBottom: 4, textAlign: "center" }}
        >
          Lần thi gần nhất
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Progress
            type='circle'
            percent={caculatePercentResult(
              lastestResultExam?.point,
              lastestResultExam?.max_point
            )}
            style={{ alignSelf: "center" }}
            status={lastestResultExam.is_pass ? "" : "exception"}
          />
          <Box sx={{ marginLeft: 1 }}>
            <Typography variant='h2'>
              {`${lastestResultExam.point}/${lastestResultExam.max_point}`}
            </Typography>

            <Typography
              variant='subtitle2'
              sx={{ display: "flex", alignItems: "center" }}
            >
              <AccessTimeIcon sx={{ marginRight: 1 }} />
              {showTime(lastestResultExam.duration)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LastestResult;
