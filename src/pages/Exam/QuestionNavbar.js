import { MENUBAR } from './constant'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const QuestionNavbar = (menuBar) => {
    const [questionAmount, setQuestionAmout] = useState(20)
    const renderQuestionContainer = () => {
        let result = []
        for (let i = 0; i < questionAmount; i++) {
            result.push(<Button>i</Button>)
        }
        return resul
    }

    return (
        <Box>
            <div>QuestionNavbar</div>
            <hr />
            {renderQuestionContainer}


        </Box>
    )
}

export default QuestionNavbar