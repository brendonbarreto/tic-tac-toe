import React from 'react'
import Board from '../Board'
import styles from './Game.scss'
import MarkTypeEnum from '../../MarkTypeEnum'
import _ from 'lodash'
import WINNING_COMBINATIONS from '../../WinningCombinations'
import Player from '../Player'
import FirstOptionBot from '../../handlers/bots/FirstOptionBot';
import RandomBot from '../../handlers/bots/RandomBot';
import AnimationDelay from '../../AnimationDelay'


export default class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            marks: [],
            players: {
                x: {
                    handler: RandomBot
                },
                o: {
                    handler: FirstOptionBot
                }
            },
            winningCombination: null,
            gameSpeed: AnimationDelay.soFastThatICantEvenSeeIt
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

    getCurrentMarkType = () => this.getLastMarkType() == MarkTypeEnum.X ? MarkTypeEnum.O : MarkTypeEnum.X

    addMark = (place) => {
        const markType = this.getCurrentMarkType()
        this.setState({
            marks: [...this.state.marks, { markType: markType, place }]
        }, () => {
            const winningCombination = this.getPlayerWinningCombination(markType)
            if (winningCombination) {
                this.setState({
                    winningCombination: winningCombination
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            winningCombination: null
                        }, () => {
                            this.resetMarksAndContinue()
                        })
                    }, this.state.gameSpeed.endGame)
                })
            } else if (this.state.marks.length === 9) {
                this.resetMarksAndContinue()
            } else {
                this.callNextPlay()
            }
        })
    }

    callNextPlay = () => {
        setTimeout(() => {
            const place = this.state.players.x.handler.play(this.state.marks)
            this.addMark(place)
        }, this.state.gameSpeed.botMark)
    }

    resetMarksAndContinue = () => {
        setTimeout(() => {
            this.setState({
                marks: []
            }, () => {
                this.callNextPlay()
            })
        }, this.state.gameSpeed.endGame)
    }

    render() {
        return (
            <div className='game-container'>
                <div className='player-container'>
                    <Player />
                </div>
                <div className='board-container'>
                    <Board
                        marks={this.state.marks}
                        addMark={this.addMark}
                        currentMarkType={this.getCurrentMarkType()}
                        winningCombination={this.state.winningCombination}
                    />
                </div>
                <div className='player-container'>
                    <Player />
                </div>
            </div>
        )
    }
}