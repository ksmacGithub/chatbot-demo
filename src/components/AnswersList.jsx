import React from 'react'
import { Answer } from './index'

const AnswersList = (props) => {
    return(
    <div className='c-grid__answer'>
        {props.answers.map((value, index) => {
            // keyのindexは一回目の繰り返しの時0, 二回目の時1みたいな感じ
            // key={index.toString()}入れないとエラー出るよ（ドキュメント参照 実践編6 19:00）
            return <Answer content={value.content} nextId={value.nextId} key={index.toString()} select={props.select} />
        })}
    </div>
    )
}

export default AnswersList