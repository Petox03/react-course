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

    console.log(state);

    React.useEffect(() => {
        console.log("starting effect");

        if (!!state.loading) {
            setTimeout(() => {
                console.log("Validando gei");

                if(state.value === SECURITY_CODE){
                    setState({
                        ...state,
                        error: false,
                        loading: false,
                        confirmed: true,
                    });
                }else{
                    setState({
                        ...state,
                        error: true,
                        loading: false
                    });
                }

                console.log("Validación terminada, gei");
            }, 3000);
        }
    }, [state.loading]);

    if(!state.deleted && !state.confirmed){
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
                    onChange={(event)=>{
                        /* setError(false); */
                        setState({
                            ...state,
                            value: event.target.value
                        });
                    }}
                />
                <button onClick={() => {
                    /* setError(false) */
                    setState({
                        ...state,
                        loading: true
                    });
                }}>Comprobar</button>
            </div>
        );
    }
    else if(!!state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <p>¿Seguro que quiere eliminar {name}</p>
                <button
                    onClick={()=>{
                        setState({
                            ...state,
                            deleted: true,
                        })
                    }}
                >
                    Si, eliminar
                </button>
                <button
                    onClick={()=>{
                        setState({
                            ...state,
                            confirmed: false,
                        })
                    }}
                >
                    No, cancelar
                </button>
            </React.Fragment>
        );
    }
    else{
        return(
            <React.Fragment>
                <p>eliminado con éxito</p>
                <button
                    onClick={()=>{
                        setState({
                            ...state,
                            confirmed: false,
                            deleted: false,
                        })
                    }}
                >
                    Deshacer
                </button>
            </React.Fragment>
        );
    }
}

export { UseState };