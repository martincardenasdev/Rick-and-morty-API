import axios from 'axios'
import { type Info, type Character } from '../rick-and-morty/interfaces'
import {
  SELECT_CHARACTERS,
  SET_CHARACTERS,
  SET_ERROR,
  SET_LOADING,
  TOGGLE_FAVORITE,
  SELECT_CHARACTER_DETAILS,
  SET_QUERY,
} from './types/actionTypes'
import { RICK_AND_MORTY_API_BASE_URL } from '../constants/env'

import type { Dispatch } from 'redux'

export const fetchCharacters = (query?: string, page = 1) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SET_LOADING, payload: true })

    try {
      let url = `${RICK_AND_MORTY_API_BASE_URL}/character?page=${page}`
      if (query) {
        url += `&name=${query}`
      }

      const response = await axios.get<Info<Character[]>>(url)

      if (!response.data.results || response.data.results.length === 0) {
        dispatch(setError('No characters found'))
        return
      }

      dispatch(setCharacters(response.data))
    } catch (e) {
      dispatch(setError(String(e)))
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const setQuery = (query: string) => ({
  type: SET_QUERY,
  payload: query,
})

export const setCharacters = (characters: Info<Character[]>) => ({
  type: SET_CHARACTERS,
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
