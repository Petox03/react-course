import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        });
    };

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        });
    };

    const onWrite = (event) =>{
        setState({
            ...state,
            value: event.target.value
        });
    };

    const onCheck = () =>{
        setState({
            ...state,
            loading: true
        });
    };

    const onDelete = () =>{
        setState({
            ...state,
            deleted: true,
        })
    };

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
        })
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
                    onChange={(event) => {
                        /* setError(false); */
                        onWrite(event);
                    }}
                />
                <button onClick={() => {
                    /* setError(false) */
                    onCheck();
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
                        onDelete();
                    }}
                >
                    Si, eliminar
                </button>
                <button
                    onClick={() => {
                        onReset();
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
                        onReset();
                    }}
                >
                    Deshacer
                </button>
            </React.Fragment>
        );
    }
}

export { UseState };