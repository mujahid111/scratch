/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable eslint-comments/no-unused-disable */

import Axios from 'axios';

const BASE_URL="https://www.breakingbadapi.com/";

export const getCharactersData = () => Axios.get(`${BASE_URL}api/characters`);
export const searchCharactersData = (query) => Axios.get(`${BASE_URL}api/characters?name=${query}`);