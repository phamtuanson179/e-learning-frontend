import { Box, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableHistoryExam from "./TableHistoryExam";


const HistoryExam = () => {

    return (
        <Box className="personal-info__container">
            <Box className="title__box" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h5' component={'div'}>Lịch sử thi</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: 1.5 }}>
                <TableHistoryExam />
            </Box>
        </Box>
    );
}

export default HistoryExam;