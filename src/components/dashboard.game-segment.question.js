import React, { Component } from 'react'
import { Button, Header, Input, Message } from 'semantic-ui-react'

import styles from './dashboard.game-segment.question.module.css'

const AnswerInput = ({answerType,handler,loading}) => {
    switch(answerType){
        case 'number': {
            return <Input placeholder="Your numerical answer" type="number" onChange={handler} loading={loading}/>
        }

        case 'string': {
            return <Input placeholder="Your Answer" type="text" onChange={handler} loading={loading}/>
        }

        default: return <Input onChange={handler} loading={loading}/>
    }
}


const ButtonGroup = ({onSubmit,onSkip,showSkip}) => {
    return <div className={styles['clear-fix'] + " " + styles['button-group']}>
        {showSkip && <Button floated="left" onClick={onSkip}>Skip</Button>}
        <Button floated="right" positive onClick={onSubmit}>Submit</Button>
    </div>
}

export default class QuestionBox extends Component{
    state = {
        answer: ''
    }

    handleSubmit = () => this.props.onSubmit(this.state.answer)
    handleAnswerFieldChange = ({target}) => this.setState({answer: target.value})
    render(){
        return (
            <div className={styles['question-box-container']}>
                {this.props.isBonus && 
                        <Message 
                             icon='star' 
                             header="Here's your bonus question!"
                             content={`Bonus questions are worth ${this.props.point} points`}
                        />}
                <Header as='h3'>
                    {this.props.title}
                </Header>
                <AnswerInput answerType={this.props.answerType} handler={this.handleAnswerFieldChange} loading={this.props.submitLoading} />
                <ButtonGroup
                    showSkip={this.props.isBonus}
                    onSkip={this.props.onSkip}
                    onSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}