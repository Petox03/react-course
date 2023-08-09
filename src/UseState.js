import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {

    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log("starting effect");

        if (!!loading) {
            setTimeout(() => {
                console.log("Validando gei");

                if(value === SECURITY_CODE){
                    setError(false);
                }else{
                    setError(true);
                }
                setLoading(false)

                console.log("Validación terminada, gei");
            }, 3000);
        }

        console.log("ending effect");
    }, [loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>

            <p>Por favor, escribe el código de seguridad</p>

            {error && (
                <p>Error: el código es incorrecto</p>
            )}
            {loading && (
                <p>cargando...</p>
            )}

            <input
                placeholder="Código de Seguridad"
                value={value}
                onChange={(event)=>{
                    setValue(event.target.value);
                }}
             />
            <button onClick={() => {
                setLoading(true)
            }}>Comprobar</button>
        </div>
    );
}

export { UseState };