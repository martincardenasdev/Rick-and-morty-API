import type { Character, Info } from '../../rick-and-morty/interfaces'
import {
  SELECT_CHARACTERS,
  SET_CHARACTERS,
  SET_ERROR,
  SET_LOADING,
  TOGGLE_FAVORITE,
  SELECT_CHARACTER_DETAILS,
  SET_QUERY,
} from './actionTypes'

interface SetCharactersAction {
  type: typeof SET_CHARACTERS
  payload: Info<Character[]>
}

interface SetQueryAction {
  type: typeof SET_QUERY
  payload: string
}

interface SelectCharactersAction {
  type: typeof SELECT_CHARACTERS
  payload: number[]
}

interface SelectCharacterDetailsAction {
  type: typeof SELECT_CHARACTER_DETAILS
  payload: number
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
  | SetQueryAction
  | SelectCharactersAction
  | SelectCharacterDetailsAction
  | ToggleFavoriteAction
  | SetLoadingAction
  | SetErrorAction
