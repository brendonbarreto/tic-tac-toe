import _ from 'lodash'
import Bot from "./Bot";

export default class RandomBot extends Bot {
    static play(marks) {
        const availablePlaces = this.getAvailablePlaces(marks)
        return _.shuffle(availablePlaces)[0]
    }
}