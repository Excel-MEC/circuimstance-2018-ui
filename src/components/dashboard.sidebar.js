import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Icon, Menu  } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './dashboard.sidebar.module.css'

const getSuffix = (num) => {
    switch(num%10){
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: 'th'
    }
}


const Sidebar = props => (
        <div className={`${styles['dashboard-sidebar']} ${props.showSidebar?"":styles['hidden']}`}>
            <div className={styles['sidebar-avatar-container']}>
                <img src={props.userData.avatarUrl} alt="avatar"/>
            </div>
            <div className={styles['sidebar-user-info']}>
                <h2>{props.userData.name}</h2>
            </div>
            <div className={styles['sidebar-user-meta']}>
                <div className={styles['sidebar-user-meta-score']}>
                    <p><FontAwesomeIcon icon="trophy" color="#eca536"/> {props.userData.score} <span className={styles['superscript']}>pts.</span></p>
                </div>
                <div className={styles['sidebar-user-meta-rank']}>
                <p><FontAwesomeIcon icon="award" color="#3c8e00"/> {props.userData.rank} <span className={styles['superscript']}>{getSuffix(props.userData.rank)}</span></p>
                </div>
            </div>
            <div className={styles['sidebar-main-menu']}>
                <Menu vertical fluid>
                    {props.menuItems.map((item,i) => (
                        <Menu.Item
                            key={i}
                            name={item.name}
                            active={props.activeMenuItem === item.name}
                            onClick={props.onMenuItemClick}
                        ><Icon name={item.icon}/>{item.title}</Menu.Item>
                    ))}
                </Menu>
            </div>
            {props.admin &&
            <div className={styles['sidebar-signout-button']}>
                <Link to='/admin'>
                    <Button icon='power off' content='Admin' labelPosition="right" fluid/>
                </Link>
            </div>
            }
            <div className={styles['sidebar-signout-button']}>
                <Button icon='power off' content='Sign Out' labelPosition="right" fluid onClick={props.logoutAction}/>
            </div>
            <div className={styles['sidebar-help-link']}>
                <p><a href="https://excelmec.org/#/contacts" style={{color: '#4a4a4a'}}>Need Help?</a></p>
            </div>
        </div>

)

export default Sidebar
