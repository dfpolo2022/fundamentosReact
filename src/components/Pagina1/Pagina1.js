import React from 'react';
import style from './pagina1.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

function Pagina1(props) {
	const [state, setState] = React.useState({
		nombre: '',
		email: '',
		telefono: '',
	});

	const navigate = useNavigate();

	const handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		setState({
			...state,
			[name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const { nombre, email, telefono } = state;

		if (nombre === '' || email === '' || telefono === '')
			return alert('Por favor llene todos los campos');

		localStorage.setItem('user', JSON.stringify(state));
		navigate('/calendario');
	};

	return (
		<>
			<section className={style.section}>
				<p className={style.titulo}>¡Bienvenidos a MeTocaFinal LTDA!</p>
				<form onSubmit={handleSubmit}>
					<div className={style.contenedor}>
						<div className={style.contenedorRow}>
							<h3>Nombre :</h3>
							<input
								type="text"
								value={state.nombre}
								name="nombre"
								onChange={handleInputChange}
								className={style.input}
							></input>
						</div>
						<div className={style.contenedorRow}>
							<h3>E-Mail :</h3>
							<input
								type="text"
								value={state.email}
								name="email"
								onChange={handleInputChange}
								className={style.input}
							></input>
						</div>
						<div className={style.contenedorRow}>
							<h3>Telefono :</h3>
							<div className={style.divisor}></div>
							<input
								type="text"
								value={state.telefono}
								name="telefono"
								onChange={handleInputChange}
								className={style.input}
							></input>
						</div>
						<div className={style.contenedorSubmit}>
							<input
								type="submit"
								className={style.inputSubmit}
								value="REGISTRARSE"
							></input>
						</div>
					</div>
				</form>
				<div className={style.flexImagenes}>
					<img src={require('../../img/izquierdaPag1.png')} />
					<img src={require('../../img/derechaPag1.png')} />
				</div>
			</section>
		</>
	);
}

export default Pagina1;
