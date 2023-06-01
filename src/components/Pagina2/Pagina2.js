import React from 'react';
import Navegacion from '../Navegacion';
import style from './pagina2.module.css';
import { Calendario } from '../Calendario/Calendario';
import { Navigate, useNavigate } from 'react-router-dom';

function Pagina2(props) {
	const user = JSON.parse(localStorage.getItem('user'));
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('user');
		navigate('/');
	};

	if (!user) return <Navigate to="/" />;

	return (
		<>
			<header className={style.headerStyle}>
				<a href="#" className={style.headerLinks}>
					{user.nombre.toUpperCase()}
				</a>
				<a href="#" className={style.headerNotif} onClick={handleLogout}>
					CERRAR SESIÓN
				</a>
			</header>
			<Calendario />
		</>
	);
}

export default Pagina2;
