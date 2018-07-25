import React from 'react'
import Board from '../Board'
import styles from './Game.scss'
import MarkTypeEnum from '../../MarkTypeEnum'
import _ from 'lodash'

export default class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            marks: [],
        }
    }

    getLastMarkType = () => {
        const lastMark = _.last(this.state.marks)
        return lastMark && lastMark.markType
    }

    getNextMark = () => this.getLastMarkType() == MarkTypeEnum.X ? MarkTypeEnum.O : MarkTypeEnum.X

    addMark = (place) => {
        this.setState({
            marks: [...this.state.marks, { markType: this.getNextMark(), place }]
        })
    }

    render() {
        return (
            <div className='game-container'>
                <div className='player-container'>
                </div>
                <div className='board-container'>
                    <Board
                        marks={this.state.marks}
                        addMark={this.addMark}
                    />
                </div>
                <div className='player-container'>
                </div>
            </div>
        )
    }
}