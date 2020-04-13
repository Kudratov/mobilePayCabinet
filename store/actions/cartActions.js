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
} from './action-types/cart-actions'

// Change language
export const changeLanguage = (lan) => {
    return {
        type: CHANGE_LANGUAGE,
        lan
    }
}

export const addPhoneNumber = (Pnumber) => {
    return {
        type: ADD_PHONE_NUMBER,
        Pnumber
    }
}

export const addAuthtoken = (token) => {
    return {
        type: ADD_AUTH_TOKEN,
        token
    }
} 

export const addLoginStatus = (status) => {
    return {
        type: ADD_LOGIN_STATUS,
        status
    }
}

export const addCard = (cards) => {
    return {
        type: ADD_CARD,
        cards
    }
}

export const addHistory = (history) => {
    return {
        type: ADD_TRANSACTIONS_HISTORY,
        history
    }
}

export const addRecieverInfo = (info) => {
    return {
        type: ADD_RECIEVER_INFO,
        info
    }
}

export const addTransferAmount = (amount) => {
    return {
        type: ADD_TRANSFER_AMOUNT,
        amount
    }
}

export const addCardIdToTransfer = (cardId) => {
    return {
        type: ADD_CARD_ID_TO_TRANSFER,
        cardId
    }
}

export const addCardCredentails = (id, info) => {
    return {
        type: ADD_CARD_CREDENTIALS,
        id,
        info
    }
}