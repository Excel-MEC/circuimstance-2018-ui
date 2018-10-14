import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { getRound } from '../actions/round'
import { fetchQuestions, fetchBonusQuestion } from '../actions/question'
import Hammer from 'react-hammerjs'
import { Redirect } from  'react-router-dom'

import Sidebar from '../components/dashboard.sidebar'
import GameSegment from '../components/dashboard.game-segment'
import LeaderboardSegment from '../components/dashboard.leaderboard-segment'

// import AuthStore from '../store/auth'

import styles from './dashboard.module.css'


const mapStateToProps = state => ({
    user: state.user,
    round: state.round,
    game: state.game
})

const mapDispatchToProps = dispatch => ({
    logoutAction: () => dispatch(logout()),
    getRound: () => dispatch(getRound())
    // fetchQuestions: () => dispatch(fetchQuestions()),
    // fetchBonusQuestion: () => dispatch(fetchBonusQuestion()),
})

class Dashboard extends Component{
    state = {
        showSidebar : true,
        menuItems: [
            { name: 'play', title: 'Play', icon: 'play'},
            { name: 'leaderboard', title: 'Leaderboard', icon: 'trophy'},
        ],
        activeMenuItem: 'play',
        leaderboard: [
            { firstName: 'Navin', score: 123,lastName: 'Mohan'},
            { firstName: 'Arjun', score: 122,lastName: 'Nair'},
            { firstName: 'Roshan', score: 121,lastName: 'V'},
            { firstName: 'Renjith', score: 103,lastName: 'PK'},
        ],
        questions: [
            {title:"some question?",isBonus:false,answerType:"number", answered: false, disabled: false, id:12},
            {title:"some question?",isBonus:false,answerType:"string", answered: true, disabled: false, id:34},
            {title:"some question?",isBonus:false,answerType:"string", answered: true, disabled: false, id:342},
            {title:"some question?",isBonus:false,answerType:"string", answered: false, disabled: false, id:454},
            {title:"some question?",isBonus:false,answerType:"number", answered: true, disabled: false, id:23},
            {title:"some question?",isBonus:true,answerType:"string", answered: false, disabled: false, id:890},
        ],
        activeQuestion:0,
        admin: false
    }

    constructor(props){
        super(props)

        var questions = this.props.round.questions
        
        questions = questions.concat(this.props.question.bonusQuestions.map(item => ({...item, isBonus: true})))
        
        for(var i=0; i < this.props.question.bonusQuestionCount - this.props.question.bonusQuestions.length; i++ ){
            questions.push({isBonus: true})
        }

        this.state = {...this.state,userData,questions,activeQuestion:questions[0]._id}
    }

    componentWillReceiveProps(nextProps){
        var questions = this.props.question.questions.map(item => ({...item, isBonus: true }))
        
        questions = questions.concat(this.props.question.bonusQuestions.map(item => ({...item, isBonus: true})))
        
        for(var i=0; i < this.props.question.bonusQuestionCount - this.props.question.bonusQuestions.length; i++ ){
            questions.push({isBonus: true})
        }


        this.setState({userData, questions})
    }

    onMenuItemClick(e, { name }){
        this.setState({activeMenuItem:name})
    }

    onQuestionTabClick = (e, { name }) => {
        this.setState({activeQuestion:name})
    }

    componentDidMount(){
        this.props.fetchQuestions()
    }

    getActiveSection(){


        const gameData = {
            round: this.props.game.round,
            description: this.props.game.roundDescription,
            title: this.props.game.roundTitle,
            imageURL: this.props.game.imageURL,            
        }
        switch(this.state.activeMenuItem){
            case "play": return( 
                <GameSegment 
                    gameData={gameData} 
                    loading={this.props.question.loading}
                    showBonus={this.props.question.showBonus}
                    questions={this.state.questions}
                    activeQuestion={this.state.activeQuestion}
                    onQuestionTabClick={this.onQuestionTabClick}
                />)
            case "leaderboard": return <LeaderboardSegment playerList={this.state.leaderboard}/>
        }
    }

    handleSwipe = (e) => {
        this.setState({showSidebar: e.deltaX > 0})
    }


    render(){

        if(!this.props.auth.authenticated){
            return  <Redirect to="/login"/>
        }

        const userData = this.props.user

        document.title = `Dashboard - ${userData.name}`
        return (
            <Hammer onSwipe={this.handleSwipe}>
                <div className={styles['dashboard-container']}>
                    <Sidebar
                        userData={userData}
                        showSidebar={this.state.showSidebar}
                        menuItems={this.state.menuItems}
                        onMenuItemClick={this.onMenuItemClick.bind(this)}
                        activeMenuItem={this.state.activeMenuItem}
                        admin={this.props.auth.admin}
                        logoutAction={this.props.logoutAction}
                        />
                        <div className={styles['game-section']}>      
                            {this.getActiveSection()}
                        </div>
                </div>
            </Hammer>
        )
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)