import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Typography } from "@mui/material";
import { Progress } from "antd";
import examAPI from "api/examAPI";
import { useState } from "react";
import { convertSecondToTime } from "utils/convert";
import "./Ranking.scss";

const Ranking = ({ lastestResultExam }) => {

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
          height: '100%'
        }}
        className='ranking__container'
      >
        <Typography
          variant='h5'
          component={"div"}
          sx={{ marginBottom: 4, textAlign: "center" }}
        >
          Xếp hạng
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box flex={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h1">1</Typography>
            <Typography variant="body1" >Sonpt</Typography>
          </Box>

          <Box flex={1}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5">1</Typography>
              <Typography variant="subtitle2" >Sonpt</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5">1</Typography>
              <Typography variant="subtitle2" >Sonpt</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5">1</Typography>
              <Typography variant="subtitle2" >Sonpt</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Ranking;
