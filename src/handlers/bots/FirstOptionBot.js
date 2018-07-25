import Bot from "./Bot";

export default class FirstOptionBot extends Bot {
    static play(marks) {
        const availablePlaces = this.getAvailablePlaces(marks)
        return availablePlaces[0]
    }
}