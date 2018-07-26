import PlaceEnum from './PlaceEnum'

const WINNING_COMBINATIONS = [
  [PlaceEnum.TOP_LEFT, PlaceEnum.TOP_CENTER, PlaceEnum.TOP_RIGHT],
  [PlaceEnum.MIDDLE_LEFT, PlaceEnum.MIDDLE_CENTER, PlaceEnum.MIDDLE_RIGHT],
  [PlaceEnum.BOTTOM_LEFT, PlaceEnum.BOTTOM_CENTER, PlaceEnum.BOTTOM_RIGHT],
  [PlaceEnum.TOP_LEFT, PlaceEnum.MIDDLE_LEFT, PlaceEnum.BOTTOM_LEFT],
  [PlaceEnum.TOP_CENTER, PlaceEnum.MIDDLE_CENTER, PlaceEnum.BOTTOM_CENTER],
  [PlaceEnum.TOP_RIGHT, PlaceEnum.MIDDLE_RIGHT, PlaceEnum.BOTTOM_RIGHT],
  [PlaceEnum.TOP_LEFT, PlaceEnum.MIDDLE_CENTER, PlaceEnum.BOTTOM_RIGHT],
  [PlaceEnum.TOP_RIGHT, PlaceEnum.MIDDLE_CENTER, PlaceEnum.BOTTOM_LEFT]
]

export default WINNING_COMBINATIONS
