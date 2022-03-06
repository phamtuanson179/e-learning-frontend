import { MENUBAR, STATUS } from './constant'
import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const QuestionNavbar = ({ questionAmount, curIndexQuestion, setCurIndexQuestion, curQuestion, questions }) => {
    console.log({ questions })

    const renderQuestionContainer = () => {
        let result = []
        for (let i = 0; i < questionAmount; i++) {
            if (i === 0) {
                result.push(<Button key={i} id={i} onClick={onClickButtonQuestion} className='active' >{i + 1}</Button>)
            } else
                result.push(<Button key={i} id={i} onClick={onClickButtonQuestion}>{i + 1}</Button>)

        }
        return result
    }

    const onClickButtonQuestion = (e) => {
        const idx = e.target.id
        setCurIndexQuestion(parseInt(idx))
    }

    const addStyleActive = (id) => {
        document.getElementById(id).classList.add('active')
    }

    const removeStyleActive = (id) => {
        document.getElementById(id).classList.remove('active')
    }

    const addStyleResponsed = (id) => {
        document.getElementById(id)?.classList.add('responsed')
    }

    const removeStyleResponsed = (id) => {
        document.getElementById(id)?.classList.remove('responsed')
    }

    useEffect(() => {
        for (let i = 0; i < questionAmount; i++) {
            //add style responsed cho nhung cau da tra loi
            if (questions) {
                if (questions[i]?.status !== STATUS.NORESPONSE)
                    addStyleResponsed(i)
                else
                    removeStyleResponsed(i)
            }

            //add style cho cau dang tra loi
            if (i === curIndexQuestion) {
                addStyleActive(i)
            } else {
                removeStyleActive(i)
            }
        }
    }, [curIndexQuestion])

    return (
        <Box>
            <Typography className='title__box' component='div' variant='subtitle1'>Exam Navigator</Typography>
            {/* <Typography className='question_answered__amount' component='div' variant='subtitle2'>Số câu đã trả lời</Typography> */}
            <div className='select-question__box'>
                <div className='select-question'>
                    {renderQuestionContainer()}
                </div>
            </div>
        </Box>
    )
}

export default QuestionNavbar