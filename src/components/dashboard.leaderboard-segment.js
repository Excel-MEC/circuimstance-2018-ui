import React from 'react'
import { Segment, Header, Divider, List, Image } from 'semantic-ui-react'
import styles from './dashboard.leaderboard-segment.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LeaderboardSegment = props => (
    <div className={styles['leaderboard-segment-container']}>
        <Segment raised>
            <Header as='h2'>
                <FontAwesomeIcon icon='trophy' color='#3c8e00'/>
                <Header.Content style={{paddingLeft:"10px"}}> Leaderboard</Header.Content>
            </Header>
            <Divider/>
            <List divided relaxed>
                {props.playerList.filter(player => player !== null).map((player,i) => (
                    <List.Item key={i}>
                        <List.Content floated='right' verticalAlign='middle'>
                            <List.Header as='h4'>#{i+1}</List.Header>
                        </List.Content>
                        <Image verticalAlign='middle' avatar src={player.imageURL}/>
                        <List.Content verticalAlign='middle'>
                            <List.Header as='h3'>
                                {player.fullName}
                            </List.Header>
                            <List.Description>
                                <FontAwesomeIcon icon="trophy" color="#eca536"/>{`  ${player.score} pts`}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </Segment>
    </div>
)

export default LeaderboardSegment