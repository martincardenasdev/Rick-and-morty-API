import type { Character } from '../../rick-and-morty/interfaces'
import {
  TOGGLE_SELECT_ALL_CHARACTERS,
  SELECT_CHARACTERS,
  SET_CHARACTERS,
  SET_ERROR,
  SET_LOADING,
  TOGGLE_FAVORITE,
  SELECT_CHARACTER_DETAILS,
  SEARCH_CHARACTERS,
} from './actionTypes'

interface SetCharactersAction {
  type: typeof SET_CHARACTERS
  payload: Character[]
}

interface SearchCharactersAction {
  type: typeof SEARCH_CHARACTERS
  payload: Character[]
}

interface SelectCharactersAction {
  type: typeof SELECT_CHARACTERS
  payload: number[]
}

interface SelectCharacterDetailsAction {
  type: typeof SELECT_CHARACTER_DETAILS
  payload: number
}

interface ToggleSelectAllCharactersAction {
  type: typeof TOGGLE_SELECT_ALL_CHARACTERS
  payload: number[]
}

interface ToggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE
  payload: number[]
}

interface SetLoadingAction {
  type: typeof SET_LOADING
  payload: boolean
}

interface SetErrorAction {
  type: typeof SET_ERROR
  payload: string
}

export type CharacterActionTypes =
  | SetCharactersAction
  | SearchCharactersAction
  | SelectCharactersAction
  | SelectCharacterDetailsAction
  | ToggleSelectAllCharactersAction
  | ToggleFavoriteAction
  | SetLoadingAction
  | SetErrorAction
