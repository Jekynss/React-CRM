
export const ADD_CARD = "ADD_CARD"
export const DELETE_CARD = "DELETE_CARD"
export const UPDATE_CARD = "DELETE_CARD"

export const addCard=(card)=>({
    type:ADD_CARD,
    card
})

export const deleteCard=(card_id)=>({
    type:DELETE_CARD,
    card_id
})

export const updateCard=(card)=>({
    type:UPDATE_CARD,
    card
})