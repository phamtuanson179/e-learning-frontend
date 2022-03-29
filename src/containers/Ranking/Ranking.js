import { Box, Button, Typography, Modal, Divider } from "@mui/material";
import examAPI from "api/examAPI";
import { useState } from "react";
import RankingTable from "containers/RankingTable";
import { convertSecondToTime } from "utils/convert";
import "./Ranking.scss";
import HistoryExamTable from "containers/HistoryExamTable";


// function createData(user_name, duration, point) {
//   return { user_name, duration, point};
// }

const Ranking = ({ rankingExam, historyRanking }) => {
  console.log({ rankingExam });
  // const [lists, setLists] = useState();

  // const caculatePercentResult = (point, maxPoint) => {
  //   return (point / maxPoint) * 100;
  // };

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
        {/* <Box
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
              <Typography variant="subtitle2" >{showTime(rank.duration)}</Typography>
            </Box>
          </Box>
        </Box> */}
        <Box >
          <RankingTable historyRanking={historyRanking} />
        </Box>
      </Box>
    </>
  );
};

export default Ranking;
