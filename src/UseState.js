import React from "react";

function UseState({ name }) {

    const [error, setError] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log("starting effect");

        if (!!loading) {
            setTimeout(() => {
                console.log("Validando gei");

                setLoading(false);

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

            <input placeholder="Código de Seguridad" />
            <button onClick={() => {
                setLoading(true)
            }}>Comprobar</button>
        </div>
    );
}

export { UseState };