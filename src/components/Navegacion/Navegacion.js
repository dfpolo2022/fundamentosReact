import React from "react";
import { Link } from "react-router-dom";
import style from "./navegacion.module.css"


class Navegacion extends React.Component {

    render() {

        return (
            <>
            <header className={style.contenedor}>
                <Link to="/">REGISTRO</Link>
                <Link to="/calendario">CALENDARIO</Link>
            </header>
                

            </>
        )
    }
}

export default Navegacion