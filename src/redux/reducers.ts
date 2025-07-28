import type { Character } from '../rick-and-morty/interfaces'
import { toggleArrayItems } from '../utils/toggleArrayItems'
import type { CharacterActionTypes } from './types/action'
import {
  SEARCH_CHARACTERS,
  SELECT_CHARACTER_DETAILS,
  SELECT_CHARACTERS,
  SET_CHARACTERS,
  SET_ERROR,
  SET_LOADING,
  TOGGLE_FAVORITE,
  TOGGLE_SELECT_ALL_CHARACTERS,
} from './types/actionTypes'

export interface CharactersState {
  characters: Character[]
  searchCharacters?: Character[]
  favorites: number[]
  selectedCharacters: number[]
  onModal?: number
  isLoading: boolean
  error?: string
}

const initialState: CharactersState = {
  characters: [],
  favorites: [],
  selectedCharacters: [],
  isLoading: false,
}

const charactersReducer = (
  state = initialState,
  action: CharacterActionTypes
): CharactersState => {
  switch (action.type) {
    case SET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      }
    case SEARCH_CHARACTERS:
      return {
        ...state,
        searchCharacters: action.payload,
      }
    case SELECT_CHARACTERS: {
      return {
        ...state,
        selectedCharacters: [
          ...toggleArrayItems(state.selectedCharacters, action.payload),
        ],
      }
    }
    case SELECT_CHARACTER_DETAILS:
      return {
        ...state,
        onModal: action.payload,
      }
    case TOGGLE_SELECT_ALL_CHARACTERS:
      return {
        ...state,
        selectedCharacters: action.payload,
      }
    case TOGGLE_FAVORITE: {
      return {
        ...state,
        favorites: [...toggleArrayItems(state.favorites, action.payload)],
      }
    }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }

    case SET_ERROR:
      return {
        ...state,
        characters: [],
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default charactersReducer
