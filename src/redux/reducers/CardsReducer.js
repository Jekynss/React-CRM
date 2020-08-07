import React from 'react'
import * as actions from '../actions/CardsAction'

    const initialState={
        cards:[{
            id: '1',
            description:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
            fullName:'Lizard-1',
            email: "Shanna@melissa.tv",
            website: "hildegard.org",
            phone: "493-170-9623 x156",
            imageUrl:`https://robohash.org/${Math.random()}?set=any`
        },{
            id:'2',
            description:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
            fullName:'Lizard-2',
            email: "Nathan@yesenia.net",
            website: "anastasia.net",
            phone: "1-463-123-4447",
            imageUrl:`https://robohash.org/${Math.random()}?set=any`
        },{
            id:'3',
            description:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
            fullName:'Lizard-3',
            email: "Sincere@april.biz",
            website: "ramiro.info",
            phone: "010-692-6593 x09125",
            imageUrl:`https://robohash.org/${Math.random()}?set=any`
        },{
            id:'4',
            description:'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
            fullName:'Lizard-4',
            phone: "1-770-736-8031 x56442",
            email: "Julianne.OConner@kory.org",
            website: "kale.biz",
            imageUrl:`https://robohash.org/${Math.random()}?set=any`
        }]
    }

    export default function CardReducer(state = initialState,action){
        switch(action.type){
            case(actions.ADD_CARD):{
                return {...state,cards:[...state.cards,action.card]};
            }
            case(actions.DELETE_CARD):{
                console.log(action.card_id);
                return {...state,cards:state.cards.filter((card)=>card.id!==action.card_id)};
            }
            case(actions.UPDATE_CARD):{
                return state;
            }
        }
        return state;
    }
