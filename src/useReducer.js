const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

/* const reducer = (state, action) =>{

} */

//Con if (la obvia)
const reducerIF = (state, action) =>{
    if(action.type === 'ERROR'){
        return{
            ...state,
            error: true,
            loading: false,
        };
    }else if(action.type === 'CHECK'){
        return{
            ...state,
            loading: true,
        };
    }else if(action.type === ''){

    }else{
        return{
            ...state
        };
    }
}

//con switch (la popular)
const reducerSwitch = (state, action) =>{
    switch (state.type){
        case 'ERROR':
            return{
                ...state,
                error: true,
                loading: false,
            };

        case 'CHECK':
            return{
                ...state,
                loading: true,
            };

        default:
            return{
                ...state
            };
    }
}

//Con objetos (la favorita del pendejo de juan y tiene razón en que es más limpia)
const reducerObject = (state) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true,
    }
});

const reducer = (state, action) => {

    if(reducerObject(state)[action.type]){
        return reducerObject(state)[action.type]
    }else{
        return state;
    }

};