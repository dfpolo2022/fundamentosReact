import React from 'react'
import style from './Fruta.module.css'

class Fruta extends React.Component {

    constructor(props){
        super()
    }

    state = {
        cantidad: 0,
        total: 0 
    }

    agregar = async () => {
        await this.setState({
            cantidad: this.state.cantidad + 1,
            total: this.props.precio * (this.state.cantidad + 1)
        })

        this.props.bus({...this.props,...this.state, sumar:true})
    }

    quitar = async () => {
        await this.setState({
            cantidad: this.state.cantidad - 1,
            total: this.props.precio * (this.state.cantidad - 1)
        })

        this.props.bus({...this.props,...this.state, sumar:false})
    }

    render() {

        return(
            <div className={style.contenedor}>
                <h3>Nombre: {this.props.nombre}</h3>
                <h6>Precio: {this.props.precio}</h6>

                <button onClick={this.agregar}>+</button>
                <button onClick={this.quitar}>-</button>

                <p>Cantidad: {this.state.cantidad}</p>
                <p>Total: {this.state.total}</p>

                <hr />
            </div>
        )
    }
}

export default Fruta