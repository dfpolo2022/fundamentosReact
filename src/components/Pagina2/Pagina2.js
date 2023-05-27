import React from "react"
import Navegacion from "../Navegacion"
import style from './pagina2.module.css'
import { Calendario } from "../Calendario/Calendario"

class Pagina2 extends React.Component {

    render() {
        return (
            <>
            <header className={style.headerStyle}>
                <a href="" className={style.headerLinks}>USUARIO</a>
                <a href="" className={style.headerNotif}>NOTIFICACIONES</a>
            </header>
            <Calendario />
            </>
        )
    }
}

export default Pagina2