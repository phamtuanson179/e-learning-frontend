import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const RankExam = () => {
    return (
        <>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 4, marginLeft: 1 }} className='lastest__result'>
                <Typography variant='h5' component={'div'} sx={{ marginBottom: 4, textAlign: 'center' }}>Xếp hạng của bạn</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: "center" }}>


                </Box>
            </Box>
        </>
    )
}

export default RankExam