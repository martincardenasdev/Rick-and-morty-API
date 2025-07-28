import type { Character, Info } from '../rick-and-morty/interfaces'
import { toggleArrayItems } from '../utils/toggleArrayItems'
import type { CharacterActionTypes } from './types/action'
import {
  SELECT_CHARACTER_DETAILS,
  SELECT_CHARACTERS,
  SET_CHARACTERS,
  SET_ERROR,
  SET_LOADING,
  SET_QUERY,
  TOGGLE_FAVORITE,
} from './types/actionTypes'

export interface CharactersState {
  characters: Info<Character[]>
  query?: string
  favorites: number[]
  selectedCharacters: number[]
  onModal?: number
  isLoading: boolean
  error?: string
}

const initialState: CharactersState = {
  characters: {
    info: { count: 0, pages: 0, next: '', prev: '' },
    results: [],
  },
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
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
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
        characters: {
          info: { count: 0, pages: 0, next: '', prev: '' },
          results: [],
        },
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default charactersReducer
