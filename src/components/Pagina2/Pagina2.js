import React from 'react';
import Navegacion from '../Navegacion';
import style from './pagina2.module.css';
import { Calendario } from '../Calendario/Calendario';

class Pagina2 extends React.Component {
	render() {
		const user = JSON.parse(localStorage.getItem('user'));

		return (
			<>
				<header className={style.headerStyle}>
					<a href="" className={style.headerLinks}>
						{user.nombre.toUpperCase()}
					</a>
					<a href="" className={style.headerNotif}>
						NOTIFICACIONES
					</a>
				</header>
				<Calendario />
			</>
		);
	}
}

export default Pagina2;
