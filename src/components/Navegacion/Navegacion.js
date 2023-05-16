import React from "react";
import { Link } from "react-router-dom";


class Navegacion extends React.Component {

    render() {

        return (
            <>
                <Link to="/">Fruta</Link>
                <Link to="/pagina1">Pagina 1</Link>
                <Link to="/pagina2">Pagina 2</Link>

            </>
        )
    }
}

export default Navegacion