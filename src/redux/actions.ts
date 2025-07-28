import axios from 'axios'
import { type Info, type Character } from '../rick-and-morty/interfaces'
import {
  TOGGLE_SELECT_ALL_CHARACTERS,
  SELECT_CHARACTERS,
  SET_CHARACTERS,
  SET_ERROR,
  SET_LOADING,
  TOGGLE_FAVORITE,
  SELECT_CHARACTER_DETAILS,
  SEARCH_CHARACTERS,
} from './types/actionTypes'
import { RICK_AND_MORTY_API_BASE_URL } from '../constants/env'

import type { Dispatch } from 'redux'

export const fetchCharacters = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SET_LOADING, payload: true })

    try {
      const response = await axios.get<Info<Character[]>>(
        `${RICK_AND_MORTY_API_BASE_URL}/character`
      )

      if (!response.data.results || response.data.results.length === 0) {
        dispatch(setError('No characters found'))
        return
      }

      dispatch(setCharacters(response.data.results))
    } catch (e) {
      dispatch(setError(String(e)))
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const searchCharacters = (query: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SET_LOADING, payload: true })

    try {
      const response = await axios.get<Info<Character[]>>(
        `${RICK_AND_MORTY_API_BASE_URL}/character?name=${query}`
      )

      if (!response.data.results || response.data.results.length === 0) {
        dispatch(setError('No characters found'))
        return
      }

      dispatch(setSearchCharacters(response.data.results))
    } catch (e) {
      dispatch(setError(String(e)))
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const setCharacters = (characters: Character[]) => ({
  type: SET_CHARACTERS,
  payload: characters,
})

export const setSearchCharacters = (characters: Character[]) => ({
  type: SEARCH_CHARACTERS,
  payload: characters,
})

export const selectCharacters = (id: number[]) => ({
  type: SELECT_CHARACTERS,
  payload: id,
})

export const selectCharacterDetails = (id: number | null) => ({
  type: SELECT_CHARACTER_DETAILS,
  payload: id,
})

export const toggleSelectAllCharacters = (characters: number[]) => ({
  type: TOGGLE_SELECT_ALL_CHARACTERS,
  payload: characters,
})

export const toggleFavorite = (id: number[]) => ({
  type: TOGGLE_FAVORITE,
  payload: id,
})

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
})

export const setError = (error: string) => ({
  type: SET_ERROR,
  payload: error,
})
