import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'


import styles from './dashboard.game-segment.question-tab.module.css'

const QuestionTab = (props) => {
    
    return (
        <div className={styles['question-tab-container']}>
        {props.questions.map((item,i) => (
            <Button 
                    key={item.id} 
                    name={i}
                    disabled={(item.isBonus && !props.showBonus) || item.answered} 
                    color={item.id === props.activeQuestion?"olive":item.answered?"green":"blue"}
                    onClick={props.onQuestionTabClick}>
                {item.answered?<Icon name='check'/>:`Q${i+1}`}
            </Button>)
        )}
        </div>
    )
}

export default QuestionTab