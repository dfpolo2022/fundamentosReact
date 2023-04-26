import React from 'react';
import ReactDOM from 'react-dom/client';


class Fruta extends React.Component {



  constructor(props) {
    super()

    this.state = {
      cantidad: 0,
      total: 0
    }

    console.log('me ejecuté constructor');

  }
  shouldComponentUpdate() {
    if (this.state.cantidad < 0) return false
    return true
  }




  componentDidMount() {
    console.log('me ejecuté componentDidMount');
  }

  async agregar() {
    await this.setState({
      cantidad: this.state.cantidad + 1
    })
    console.log(this.state);
  }

  async quitar() {
      await this.setState({
        cantidad: this.state.cantidad - 1
      })

    console.log(this.state);
  }


  render() {
    console.log('me ejecuté render');
    return (
      <div>
        <h2>Nombre:{this.props.name}</h2>
        <h3>Precio:{this.props.price}</h3>

        <button onClick={this.agregar.bind(this)}>+</button>
        <button onClick={this.quitar.bind(this)}>-</button>

        <p>Cantidad:{this.state.cantidad}</p>
        <p>Total:{this.state.cantidad*this.props.price}</p>

        <hr />
      </div>
    )
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
      <Fruta name={'Fresa'} price={500} />
      
    </>
);

