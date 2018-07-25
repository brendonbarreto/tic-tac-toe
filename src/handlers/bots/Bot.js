import PlaceEnum from "../../PlaceEnum";

export default class Bot {
    static getAvailablePlaces(marks) {
        const allPlaces = Object.values(PlaceEnum)
        const markedPlaces = marks.map(mark => mark.place)
        const availablePlaces = allPlaces
            .filter(place => !markedPlaces.includes(place))

        return availablePlaces
    }
}