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

    /* actionTypes */
    const actionTypes = {
        CONFIRM: 'CONFIRM',
        ERROR: 'ERROR',
        WRITE: 'WRITE',
        CHECK: 'CHECK',
        DELETE: 'DELETE',
        RESET: 'RESET',
    };

    //Con objetos (la favorita del pendejo de juan y tiene razón en que es más limpia)
    const reducerObject = (state, payload) => ({
        [actionTypes.CONFIRM]: {
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        },
        [actionTypes.ERROR]: {
            ...state,
            error: true,
            loading: false,
        },
        [actionTypes.WRITE]: {
            ...state,
            value: payload
        },
        [actionTypes.CHECK]: {
            ...state,
            loading: true,
        },
        [actionTypes.DELETE]: {
            ...state,
            deleted: true,
        },
        [actionTypes.RESET]: {
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

    /* Action creators */
    const onConfirm = () => dispatch({ type: actionTypes.CONFIRM });
    const onError = () => dispatch({ type: actionTypes.ERROR });
    const onCheck = () => dispatch({ type: actionTypes.CHECK });
    const onDelete = () => dispatch({ type: actionTypes.DELETE });
    const onReset = () => dispatch({ type: actionTypes.RESET });

    const onWrite = (event) =>{
        dispatch({ type: actionTypes.WRITE, payload: event.target.value });
    };

    React.useEffect(() => {

        if (!!state.loading) {
            setTimeout(() => {

                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
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
                    /* onChange={(event) => {
                        onWrite(event.target.value);
                    }} */
                    onChange={onWrite}
                />
                <button onClick={() => {
                    /* setError(false) */
                    onCheck();
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
                    onClick={onDelete}
                >
                    Si, eliminar
                </button>
                <button
                    onClick={onReset}
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
                    onClick={onReset}
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