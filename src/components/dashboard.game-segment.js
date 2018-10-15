import React, { Component } from 'react'
import { Segment, Header, Image, Divider, Loader } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import QuestionBox from './dashboard.game-segment.question'
import QuestionTab from './dashboard.game-segment.question-tab'

import styles from './dashboard.game-segment.module.css'

export default class GameSegment extends Component{

    getActiveQuestion(){

        if(!this.props.questions){
            return null
        }

        return this.props.questions[this.props.activeQuestion < this.props.questions.length?this.props.activeQuestion:0]
    }
    render(){

        const activeQuestion = this.getActiveQuestion() 

        if(!activeQuestion && !this.props.levelComplete){
            return <Loader/>
        }
        return (
            <div className={styles['game-segment-container']}>
                <Segment attached='top' className={styles['clear-fix']}>
                    <Header as='h2' floated='left'>
                        <FontAwesomeIcon icon='rocket' color='#d00808'/>
                        <Header.Content style={{paddingLeft:"10px"}}>{this.props.gameData.title}</Header.Content>
                    </Header>
                    <Header as='h2' floated='right'>
                            <Header.Content style={{paddingRight:"10px"}}>  #{this.props.gameData.round}</Header.Content>
                    </Header>
                </Segment>
                <Segment attached loading={this.props.loading}>

                    {this.props.gameData.imageURL && <Image src={this.props.gameData.imageURL} fluid bordered/>}
                    {this.props.gameData.description && <Divider/>}
                    {this.props.gameData.description && <p>{this.props.gameData.description}</p>}
                </Segment>
                {!this.props.gameData.levelComplete &&
                <Segment attached loading={this.props.loading}>
                     <QuestionTab  
                        questions={this.props.questions}
                        activeQuestion={this.props.activeQuestion}
                        onQuestionTabClick={this.props.onQuestionTabClick}
                        showBonus={this.props.showBonus}
                         />
                </Segment>}
                <Segment attached loading={this.props.loading}>
                    <QuestionBox
                        title={activeQuestion.title}
                        isNumeric={activeQuestion.isNumeric}
                        submitLoading={false}
                        isBonus={activeQuestion.isBonus}
                        point={5}
                        levelComplete={this.props.gameData.levelComplete}
                    />
                </Segment>
            </div>
        )
    }
}