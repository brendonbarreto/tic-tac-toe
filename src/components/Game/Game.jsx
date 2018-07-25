import React from 'react'
import Board from '../Board'
import styles from './Game.scss'
import MarkTypeEnum from '../../MarkTypeEnum'
import _ from 'lodash'
import WINNING_COMBINATIONS from '../../WinningCombinations';

export default class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            marks: []
        }
    }

    getPlayerWinningCombination = (markType) => {
        const marks = this.state.marks
        if (marks.length >= 5) {
            const markPlaces = marks
                .filter(mark => mark.markType == markType)
                .map(mark => mark.place)
            
            return WINNING_COMBINATIONS.find(winningCombination => {
                return winningCombination.every(winningPlace => markPlaces.includes(winningPlace))
            })
        }
    }

    getLastMarkType = () => {
        const lastMark = _.last(this.state.marks)
        return lastMark && lastMark.markType
    }

    getNextMarkType = () => this.getLastMarkType() == MarkTypeEnum.X ? MarkTypeEnum.O : MarkTypeEnum.X

    addMark = (place) => {
        const markType = this.getNextMarkType()
        this.setState({
            marks: [...this.state.marks, { markType: markType, place }]
        }, () => {
            const winningCombination = this.getPlayerWinningCombination(markType)
            if (winningCombination) {
                this.setState({
                    marks: []
                })
            }
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
                        nextMark={this.getNextMarkType()}
                    />
                </div>
                <div className='player-container'>
                </div>
            </div>
        )
    }
}