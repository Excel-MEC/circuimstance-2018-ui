import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { getRound, checkAnswer } from '../actions/round'
import Hammer from 'react-hammerjs'
import { Redirect } from  'react-router-dom'
import { Icon } from 'semantic-ui-react'
import Sidebar from '../components/dashboard.sidebar'
import GameSegment from '../components/dashboard.game-segment'
import LeaderboardSegment from '../components/dashboard.leaderboard-segment'
import circumstanceLogo from '../img/circumstance.png'


// import AuthStore from '../store/auth'

import styles from './dashboard.module.css'
import RulesSegment from '../components/dashboard.rules';


const mapStateToProps = state => ({
    user: state.user,
    round: state.round,
    game: state.game,
    question: state.question,
    leaderboard: state.leaderboard.users
})

const mapDispatchToProps = dispatch => ({
    logoutAction: () => dispatch(logout()),
    getRound: () => dispatch(getRound()),
    checkAnswer: (questionId, answer) => dispatch(checkAnswer(questionId, answer)),
    skipQuestion: () => dispatch(checkAnswer())
    // fetchQuestions: () => dispatch(fetchQuestions()),
    // fetchBonusQuestion: () => dispatch(fetchBonusQuestion()),
})

class Dashboard extends Component{
    state = {
        showSidebar : true,
        menuItems: [
            {name: 'story', title: 'Story', icon: 'book'},
            { name: 'play', title: 'Play', icon: 'play'},
            { name: 'leaderboard', title: 'Leaderboard', icon: 'trophy'},
            { name: 'rules', title: 'Rules', icon:'clipboard list' }
        ],
        activeMenuItem: 'story',
        activeQuestion:0,
        admin: false,
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.question.questions.length){
            for(var i=this.state.activeQuestion;i< nextProps.question.questions.length;i++){
                if(!nextProps.question.questions[i].answered && !(nextProps.question.questions[i].isBonus && !nextProps.user.bonusEligible)){
                    this.setState({activeQuestion: i})
                    return
                }
            }
        }
    }

    componentDidMount(){
        this.props.getRound()
    }

    onMenuItemClick(e, { name }){
        this.setState({activeMenuItem:name,showSidebar:false})
    }

    onQuestionTabClick = (e, { name }) => {
        this.setState({activeQuestion:name})
    }


    getActiveSection(){


        const gameData = {
            round: this.props.game.round,
            description: this.props.game.roundDescription,
            title: this.props.game.roundTitle,
            imageURL: this.props.game.imageURL, 
            levelComplete: this.props.game.levelComplete           
        }
        switch(this.state.activeMenuItem){
            case "story":
            case "play" : return( 
                <GameSegment
                    showStory={this.state.activeMenuItem === 'story'}
                    onQuestionSubmit={this.onQuestionSubmit}
                    onQuestionSkip={this.props.skipQuestion}
                    gameData={gameData} 
                    loading={this.props.game.loading}
                    showBonus={this.props.user.bonusEligible}
                    questions={this.props.question.questions}
                    activeQuestion={this.state.activeQuestion}
                    onQuestionTabClick={this.onQuestionTabClick}
                />)
            case "leaderboard": return <LeaderboardSegment playerList={this.props.leaderboard}/>
            case "rules": return <RulesSegment/>
        }
    }

    onQuestionSubmit = (answer) => {

        const questionId = this.props.question.questions[this.state.activeQuestion].id

        this.props.checkAnswer(questionId,answer)

    }

    handleSwipe = (e) => {
        this.setState({showSidebar: e.deltaX > 0})
    }


    render(){

        if(!this.props.user.authenticated){
            return  <Redirect to="/"/>
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
                        admin={this.props.user.admin}
                        logoutAction={this.props.logoutAction}
                        />
                        <div className={styles['game-section']}>
                            <div className={`${styles['nav-menu']} ${styles['show-on-mobile']}`}>
                                <img src={circumstanceLogo} />
                                <Icon circular name='bars' onClick={() => this.setState({showSidebar:true})}/>
                            </div>
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