import React from 'react'
import styles from './Board.scss'
import PlaceEnum from '../../PlaceEnum'
import _ from 'lodash'
//this.props.marks = [{markType: X, place: 'TOP_LEFT'}]
export default class Board extends React.Component {
    constructor(props) {
        super(props)
    }

    getPlace = (place, index) => {
        const markType = this.getMarkType(place)
        return <div key={index}
            className={`place ${markType ? markType.toLowerCase() : 'a'}-place`}
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