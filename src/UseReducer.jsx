import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {

    const initialState = {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    };

    //Con objetos (la favorita del pendejo de juan y tiene razón en que es más limpia)
    const reducerObject = (state, payload) => ({
        'CONFIRM': {
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        },
        'ERROR': {
            ...state,
            error: true,
            loading: false,
        },
        'WRITE': {
            ...state,
            value: payload
        },
        'CHECK': {
            ...state,
            loading: true,
        },
        'DELETE': {
            ...state,
            deleted: true,
        },
        'RESET': {
            ...state,
            confirmed: false,
            deleted: false,
        }
    });

    const reducer = (state, action) => {

        if (reducerObject(state)[action.type]) {
            return reducerObject(state, action.payload)[action.type]
        } else {
            return state;
        }

    };

    const [state, dispatch] = React.useReducer(reducer, initialState)

    React.useEffect(() => {

        if (!!state.loading) {
            setTimeout(() => {

                if (state.value === SECURITY_CODE) {
                    dispatch({ type: 'CONFIRM' });
                } else {
                    dispatch({ type: 'ERROR' });
                }

            }, 3000);
        }
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>

                <p>Por favor, escribe el código de seguridad</p>

                {(state.error && !state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}
                {state.loading && (
                    <p>cargando...</p>
                )}

                <input
                    placeholder="Código de Seguridad"
                    value={state.value}
                    onChange={(event) => {
                        /* setError(false); */
                        dispatch({
                            type: 'WRITE', payload: event.target.value
                        });
                        /* onWrite(event); */
                    }}
                />
                <button onClick={() => {
                    /* setError(false) */
                    dispatch({
                        type: 'CHECK'
                    });
                    /* onCheck(); */
                }}>Comprobar</button>
            </div>
        );
    }
    else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Seguro que quiere eliminar {name}</p>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'DELETE'
                        });
                    }}
                >
                    Si, eliminar
                </button>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'RESET'
                        });
                    }}
                >
                    No, cancelar
                </button>
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <p>eliminado con éxito</p>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'RESET'
                        });
                    }}
                >
                    Deshacer
                </button>
            </React.Fragment>
        );
    }
}

export { UseReducer };

/* const reducer = (state, action) =>{

} */

//Con if (la obvia)
/* const reducerIF = (state, action) =>{
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
} */

//con switch (la popular)
/* const reducerSwitch = (state, action) =>{
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
} */