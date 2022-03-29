import { Box, Button, Typography, Modal, Divider } from "@mui/material";
import examAPI from "api/examAPI";
import { useEffect, useState } from "react";
import RankingTable from "containers/RankingTable";
import { convertSecondToTime } from "utils/convert";
import CloseIcon from "@mui/icons-material/Close";
import "./Ranking.scss";

const style = {
  bgcolor: "background.paper",
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  flexDirection: "column",
  borderRadius: "12px",
  bgColor: "white",
  border: "1px solid #0000003d",
};


const Ranking = ({ rankingExam, historyRanking }) => {
  console.log({ rankingExam });
  const [listShortcutRanking, setList] = useState();
  const [openModal, setOpenModal] = useState()
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const convertDatatoShortRanking=(datas ) =>{
    const listShortcutRanking=[];
    datas.map((data, idx) => {
      listShortcutRanking.push(
        createData(data?.user_name)
      );
    });
    setList(listShortcutRanking);
  };

  useEffect(()=> {
    if (historyRanking)  convertDatatoShortRanking(historyRanking);
  }, []);

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
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          { listShortcutRanking &&
          listShortcutRanking.map(list => (
                <Typography variant='h5'>
                  {list.user_name}
                </Typography>
              ))}
        </Box>
        <Button 
          sx={{ fontSize: 12, padding: 0 }} 
          onClick={() => setOpenModal(true)}>
            Xem chi tiết
        </Button>
        <Modal
              sx={{
                overflowY: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box >
          <Box sx={style}>
                <Box
                  display='flex'
                  alginItems='center'
                  justifyContent='space-between'
                  sx={{ marginTop: 2, marginLeft: 2, marginRight: 2 }}
                >
                  <Typography id='modal-modal-title' variant='h5'>
                    Xếp hạng
                  </Typography>
                  <CloseIcon
                    fontSize='medium'
                    sx={{ cursor: "pointer" }}
                    onClick={handleCloseModal}
                  />
                  </Box>
                  <Divider/>
                  <Box>
                    <RankingTable historyRanking={historyRanking} />
                  </Box>
                </Box>
          </Box>
          </Modal>
      </Box>
    </>
  );
};

export default Ranking;
