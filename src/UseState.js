import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
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
                        loading: false
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

export { UseState };