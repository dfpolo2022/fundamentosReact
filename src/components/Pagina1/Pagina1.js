import React from "react";
import { Link } from "react-router-dom";
import style from "./pagina1.module.css";
import {useNavigate} from 'react-router-dom';

class Pagina1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {nombre: '', email: '', telefono: ''};
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
          });
    }

    handleSubmit (event){
        localStorage.setItem('nombre', JSON.stringify(this.state.nombre))
        localStorage.setItem('email', JSON.stringify(this.state.email))
        localStorage.setItem('telefono', JSON.stringify(this.state.telefono))

        event.preventDefault();
    }


    render() {
        return ( 
            <>      
            <section className={style.section}>
                <form onSubmit={this.handleSubmit}>
                    <div className={style.contenedor}>
                        <div className={style.contenedorRow}>
                            <h3>NOMBRE:</h3>
                            <input type="text" value={this.state.nombre} name="nombre" onChange={this.handleInputChange} className={style.input}></input>
                        </div>
                        <div className={style.contenedorRow}>
                            <h3>E-MAIL:</h3>
                            <input type="text" value={this.state.email} name="email" onChange={this.handleInputChange} className={style.input}></input>
                        </div>
                        <div className={style.contenedorRow}>
                            <h3>TELEFONO:</h3>
                            <input type="text" value={this.state.telefono} name="telefono" onChange={this.handleInputChange} className={style.input}></input>
                        </div>
                        <div className={style.contenedorSubmit}>
                            <input type="submit" className={style.inputSubmit} value='REGISTRARSE'></input>
                        </div>
                    </div>
                </form>
            </section>
                
            </>
        )
    }
}

export default Pagina1