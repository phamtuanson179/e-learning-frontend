import { MENUBAR } from './constant'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const QuestionNavbar = (menuBar) => {
    const [questionAmount, setQuestionAmout] = useState(20)
    const renderQuestionContainer = () => {
        let result = []
        console.log('adsfasd')
        for (let i = 0; i < questionAmount; i++) {
            result.push(<Button>{i + 1}</Button>)
        }
        console.log({ result })
        return result
    }

    return (
        <Box>
            <div className='title__box'>QuestionNavbar</div>
            <hr />
            <div className='select-question__box'>
                <div className='select-question'>
                    {renderQuestionContainer()}
                </div>


            </div>


        </Box>
    )
}

export default QuestionNavbar