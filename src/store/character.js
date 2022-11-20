/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable eslint-comments/no-unused-disable */

import { createActions, createReducer } from "reduxsauce";
import { getCharactersData, searchCharactersData } from "../api";


const getCharacters = () => {
    return (dispatch) => {
        dispatch(Creators.isLoadingCharacters());
        getCharactersData()
            .then((response) => {
                dispatch(Creators.getCharactersSuccess(response.data));
            })
            .catch((error) => {
                dispatch(Creators.getCharactersError(error.message));
            });
    };
};
const searchCharacters = (query) => {
    console.log("query", query)
    return (dispatch) => {
        dispatch(Creators.isLoadingSearchCharacters());
        searchCharactersData(query)
            .then((response) => {
                console.log(response, "response")
                dispatch(Creators.getSearchCharactersSuccess(response.data));
            })
            .catch((error) => {
                dispatch(Creators.getSearchCharactersError(error.message));
            });
    };
};

const addFavourite = (item) => {
    console.log("item", item)
    return (dispatch) => {
        dispatch(Creators.setFavourite(item));
    };
};
const removeFavourite = (item) => {
    console.log("item", item)
    return (dispatch) => {
        dispatch(Creators.removeFavouriteFromState(item));
    };
};

export const { Types, Creators } = createActions({
    getCharacters,
    searchCharacters,
    addFavourite,
    removeFavourite,
    setFavourite: ["item"],
    removeFavouriteFromState: ["item"],
    getCharactersSuccess: ["characters"],
    getSearchCharactersSuccess: ["characters"],
    getSearchCharactersError: ["error"],
    getCharactersError: ["error"],
    isLoadingCharacters: [],
    isLoadingSearchCharacters: [],
});

const initialState = {
    characters: [],
    favourites: [],
    serachData: [],
    isError: false,
    isLoading: false,
    isSearching: false,
    isSearchError: null,
};

const getCharactersSuccess = (state = initialState, action) => {
    return {
        ...state,
        isLoading: false,
        characters: action.characters,
        isError: "",
    };
};
const getSearchCharactersSuccess = (state = initialState, action) => {
    return {
        ...state,
        isSearching: false,
        serachData: action.characters,
    };
};
const getSearchCharactersError = (state = initialState, action) => {
    return {
        ...state,
        isSearching: false,
        isSearchError: action.error,
    };
};

const getCharactersError = (state = initialState, action) => {
    return {
        ...state,
        isLoading: false,
        isError: action.error,
    };
};

const isLoadingCharacters = (state = initialState, action) => {
    return {
        ...state,
        isLoading: true,
        isError: "",
    };
};
const isLoadingSearchCharacters = (state = initialState, action) => {
    return {
        ...state,
        isSearching: true,
    };
};
const setFavourite = (state = initialState, action) => {
    console.log("item", action)
    return {
        ...state,
        favourites: [...state.favourites, action.item]
    };
};
const removeFavouriteFromState = (state = initialState, action) => {
    return {
        ...state,
        favourites: state.favourites.filter(a => a.char_id !== action.item.char_id)
    }
};

export default createReducer(initialState, {
    [Types.IS_LOADING_CHARACTERS]: isLoadingCharacters,
    [Types.IS_LOADING_SEARCH_CHARACTERS]: isLoadingSearchCharacters,
    [Types.GET_CHARACTERS]: getCharacters,
    [Types.SEARCH_CHARACTERS]: searchCharacters,
    [Types.ADD_FAVOURITE]: addFavourite,
    [Types.REMOVE_FAVOURITE]: removeFavourite,
    [Types.SET_FAVOURITE]: setFavourite,
    [Types.REMOVE_FAVOURITE_FROM_STATE]: removeFavouriteFromState,
    [Types.GET_CHARACTERS_ERROR]: getCharactersError,
    [Types.GET_CHARACTERS_SUCCESS]: getCharactersSuccess,
    [Types.GET_SEARCH_CHARACTERS_SUCCESS]: getSearchCharactersSuccess,
    [Types.GET_SEARCH_CHARACTERS_ERROR]: getSearchCharactersError,
});
