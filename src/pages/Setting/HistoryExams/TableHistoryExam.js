import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import examAPI from "api/examAPI";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { isEmpty } from "lodash";
import { convertSecondToTime } from "utils/convert";

function createData(id, duration, point, isPass) {
  return { id, duration, point, isPass };
}

const TableHistoryExam = ({ historyExamList }) => {
  console.log({ historyExamList });
  const [rows, setRows] = useState();

  const convertDataToRowTable = (datas) => {
    const rows = [];
    datas.map((data, idx) => {
      rows.push(
        createData(data?.id, data?.duration, data?.point, data?.is_pass)
      );
    });
    setRows(rows);
  };

  useEffect(() => {
    if (historyExamList) convertDataToRowTable(historyExamList);
  }, []);

  const showTime = (duration) => {
    const time = convertSecondToTime(duration);
    return `${time.minutes}:${time.seconds}`;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead sx={{ display: "table-header-group" }}>
          <TableRow>
            <TableCell align='center'>Stt</TableCell>
            <TableCell>Id</TableCell>
            <TableCell align='right'>Điểm</TableCell>
            <TableCell align='right'>Thời gian</TableCell>
            <TableCell align='center'>Kết quả</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align='center'>{idx + 1}</TableCell>
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell align='right'>{row.point}</TableCell>
                <TableCell align='right'>{showTime(row.duration)}</TableCell>
                <TableCell align='center'>
                  {row.isPass ? (
                    <CheckCircleIcon color='success' />
                  ) : (
                    <ErrorIcon color='error' />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHistoryExam;
