import React from 'react'
import styles from './Board.scss'
import PlaceEnum from '../../PlaceEnum'
import _ from 'lodash'
import cx from 'classnames'
import MarkTypeEnum from '../../MarkTypeEnum';
//this.props.marks = [{markType: X, place: 'TOP_LEFT'}]
export default class Board extends React.Component {
    constructor(props) {
        super(props)
    }

    isWinningPlace = (place) => {
        return this.props.winningCombination && this.props.winningCombination.includes(place)
    }

    getPlace = (place, index) => {
        const markType = this.getMarkType(place)
        const nextMark = this.props.nextMark
        const isWinningPlace = this.isWinningPlace(place)

        return <div key={index}
            className={
                cx(`place ${markType ? markType.toLowerCase() : (isWinningPlace ? 'w' : 'a')}-place`,
                {['x-next']: !markType && !isWinningPlace && nextMark == MarkTypeEnum.X},
                {['o-next']: !markType && !isWinningPlace && nextMark == MarkTypeEnum.O})
            }
            onClick={(e) => !markType && this.props.addMark(place)}>
            {
                markType && (
                    <span>{markType}</span>
                )
            }
        </div>
    }

    getMarkType = place => {
        const mark = this.props.marks.find(mark => mark.place === place)
        return mark && mark.markType
    }

    getPlaces = (places, index) => (
        <div className="board-row" key={index}>
            {places.map(this.getPlace)}
        </div>
    )

    render() {
        const placesVerticalGrouped = _.groupBy(Object.values(PlaceEnum), a => a.split('_')[0])
        return Object.values(placesVerticalGrouped)
            .map(this.getPlaces)
    }
}