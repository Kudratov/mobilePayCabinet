import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import {
    CHANGE_LANGUAGE,
    ADD_PHONE_NUMBER,
    ADD_LOGIN_STATUS,
    ADD_AUTH_TOKEN,
    ADD_CARD_CREDENTIALS,
    ADD_CARD,
    ADD_RECIEVER_INFO,
    ADD_TRANSFER_AMOUNT,
    ADD_TRANSACTIONS_HISTORY,
    ADD_CARD_ID_TO_TRANSFER
} from '../actions/action-types/cart-actions'

export const initState = {
    language: 'Русский',
    phoneNumber: '',
    loginStatus: '',
    authToken: '',
    cardCred: '',
    cards: [],
    transactionHistory: [],
    recieverInfo: '',
    transferAmount: '',
    cardIdToTransfer: ''
}

export const cartReducer= (state = initState, action) => {

    if(action.type === ADD_PHONE_NUMBER){        
        let __phoneNumber = action.Pnumber;
        return {
            ...state,
            phoneNumber: __phoneNumber
        }
    }

    if(action.type === ADD_LOGIN_STATUS){
        let __loginStatus = action.status;
        return {
            ...state,
            loginStatus: __loginStatus
        }
    }

    if(action.type === ADD_AUTH_TOKEN){
        let __token = action.token;
        return {
            ...state,
            authToken: __token
        }
    }

    if(action.type === ADD_CARD_CREDENTIALS){
        let __id = action.id;
        let __info = action.info;
        return {
            ...state,
            cardCred: `${__id} ${__info}`
        }
    }

    if(action.type === ADD_RECIEVER_INFO){
        let __info = action.info;
        return {
            ...state,
            recieverInfo: __info
        }
    }

    if(action.type === ADD_CARD){
        let __cards = action.cards;
        state.cards.length = 0;
        return {
            ...state,
            cards: state.cards.concat(__cards)
        }
    }

    if(action.type === ADD_TRANSACTIONS_HISTORY){
        let __tHistory = action.history;
        state.transactionHistory.length = 0;
        return {
            ...state,
            transactionHistory: state.transactionHistory.concat(__tHistory)
        }
    }

    if(action.type === ADD_TRANSFER_AMOUNT){
        let __amount = action.amount;
        return {
            ...state,
            transferAmount: __amount
        }
    }

    if(action.type === ADD_CARD_ID_TO_TRANSFER){
        let __cardId = action.cardId;
        return {
            ...state,
            cardIdToTransfer: __cardId
        }
    }

    if(action.type === CHANGE_LANGUAGE){
        let __newLan = action.lan;
        return {
            ...state,
            language: __newLan
        }
    }    
    else {
        return state
    }
}

export const initStore = (initialState = initState) => {
    return createStore(
            cartReducer,
            initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}