import { MENUBAR, STATUS } from './constant'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const QuestionNavbar = ({ questionAmount, curIndexQuestion, setCurIndexQuestion, curQuestion, questions }) => {


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
        console.log(typeof (idx))
        setCurIndexQuestion(parseInt(idx))
    }

    const addStyleActive = (id) => {
        document.getElementById(id).classList.add('active')
    }

    const deleteStyleActive = (id) => {
        document.getElementById(id).classList.remove('active')
    }

    const addStyleResponsed = (id) => {
        document.getElementById(id)?.classList.add('responsed')
    }

    useEffect(() => {
        for (let i = 0; i < questionAmount; i++) {
            //add style responsed cho nhung cau da tra loi
            if (questions) {
                if (questions[i]?.status !== STATUS.NORESPONSE)
                    addStyleResponsed(i)
            }

            //add style cho cau dang tra loi
            if (i === curIndexQuestion) {
                addStyleActive(i)
            } else {
                deleteStyleActive(i)
            }
        }
        // if (questions)
        //     for (let question of questions) {
        //         if (question?.status !== STATUS.NORESPONSE)
        //             addStyleResponsed(questions?.idx)
        //     }
    }, [curIndexQuestion])

    return (
        <Box>
            <div className='title__box'>Question Navigator</div>
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