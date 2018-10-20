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
    handleAnswerFieldChange = ({target}) => this.setState({answer: this.props.isNumeric?Number.parseFloat(target.value):target.value})

    getContent(){
        if(this.props.levelComplete){
            return (
            <div>
                <h1 style={{textAlign: 'center'}}> Congratulations! </h1>
                <p style={{textAlign: 'center'}}> You've completed the level!</p>
                <p style={{textAlign: 'center'}}> Wait for the next round</p>
            </div>
            )
        }

        const qBoxStyle = styles['question-box-container'] + (this.props.isBonus?` ${styles['bonus']}`:'')


        return (
            <div className={qBoxStyle}>
            {this.props.isBonus && 
            
                <Message 
                        icon='star' 
                        header="Here's your bonus question!"
                        content={`Bonus questions are worth more points`}
                /> }
                <Header as='h3'>
                    {this.props.title}
                </Header>
                <AnswerInput answerType={this.props.isNumeric?"number":"text"} handler={this.handleAnswerFieldChange} loading={this.props.submitLoading} />
                <ButtonGroup
                    showSkip={this.props.isBonus}
                    onSkip={this.props.onSkip}
                    onSubmit={this.handleSubmit}
                />
        </div>
        )
    }

    render(){
        return this.getContent()
    }
}