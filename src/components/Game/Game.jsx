import React from 'react'
import Board from '../Board'
import styles from './Game.scss'
import MarkTypeEnum from '../../MarkTypeEnum'
import _ from 'lodash'
import WINNING_COMBINATIONS from '../../WinningCombinations'
import Player from '../Player'
import FirstOptionBot from '../../handlers/bots/FirstOptionBot';
import Bot from '../../handlers/bots/Bot';

export default class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            marks: [],
            players: {
                x: {
                    handler: FirstOptionBot
                },
                o: {
                    handler: FirstOptionBot
                }
            }
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
        debugger
        const markType = this.getNextMarkType()
        this.setState({
            marks: [...this.state.marks, { markType: markType, place }]
        }, () => {
            const winningCombination = this.getPlayerWinningCombination(markType)
            if (winningCombination) {
                setTimeout(() => {
                    this.setState({
                        marks: []
                    }, () => {
                        this.xrs()
                    })
                }, 1000)
                
            } else {
                this.xrs()
            }
        })
    }

    xrs = () => {
        const isBot = Bot.isPrototypeOf(this.state.players.x.handler)
        
        setTimeout(() => {
            const place = this.state.players.x.handler.play(this.state.marks)
            this.addMark(place)
        }, 500)
    }

    // componentDidMount() {
    //     const place = this.state.players.x.handler.play(this.state.marks)
    //     this.addMark(place)
    // }

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
                        nextMark={this.getNextMarkType()}
                    />
                </div>
                <div className='player-container'>
                    <Player />
                </div>
            </div>
        )
    }
}