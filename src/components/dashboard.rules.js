import React, { Component } from 'react'

import { Segment, Header, Divider, Icon } from 'semantic-ui-react'

import styles from './dashboard.rules.module.css'

export default class RulesSegment extends Component{
    render(){
        return (
            <Segment className={styles["rules-segment-container"]}>
                <Header as='h2' textAlign="center">
                    Rules
                </Header>
                <Divider/>
                <ul className={styles['rule-list']}>
                    <li>
                    Each round will have 6 questions each.
                    </li>
                    <li>
                    All except the last round will have a bonus question, i.e, 5 normal questions + 1 bonus.
                    </li>
                    <li>
                    Regular questions carry 5 points, and the bonus question carries 10 points.
                    </li>
                    <li>
                    Last round will have only regular questions.
                    </li>
                    <li>
                    In case of tie, winner will be decided on the basis of time taken.
                    </li>
                    <li>
                    A candidate is permitted to attempt the next round only after completing the previous round(s).
                    </li>
                    <li>
                    You cannot go back to the previous questions once answered. If you skip the bonus question, you cannot attempt it again.
                    </li>
                    <li>
                    New rounds will be unlocked every 3-4 days.
                    </li>
                    <li>
                    Questions can cover the entire EC syllabus.
                    </li>
                    <li>
                    Updates and clues will be posted on the CIRCUImsTance <a href="https://facebook.com/CIRCUImsTance" target="_blank"><Icon name='facebook official' size='big' color="#3b5998"/></a>page.
                    </li>
                    <li>
                    ANY FORM OF MALPRACTICE WILL LEAD TO IMMEDIATE DISQUALIFICATION
                    </li>

                </ul>

            </Segment>
        )
    }
}