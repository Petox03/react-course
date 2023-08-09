import React from "react";

class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            loading: false,
        };
    }

    componentDidUpdate() {
        console.log("actualizado, gei");
        if (!!this.state.loading) {
            setTimeout(() => {
                console.log("Validando clase gei");

                this.setState({loading: false});

                console.log("Validación de clase terminada, gei");
            }, 3000);
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor, escribe el código de seguridad</p>

                {this.state.error && (
                    <p>Error: el código es incorrecto</p>
                )}
                {this.state.loading && (
                    <p>Cagando...</p>
                )}

                <input placeholder="Código de Seguridad" />
                <button
                    onClick={() => { this.setState({ loading: true }) }}
                >Comprobar</button>
            </div>
        );
    }
}

export { ClassState };