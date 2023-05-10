import React from 'react';
import Fruta from './components/Fruta';
import GranTotal from './components/GranTotal';

class App extends React.Component {

    constructor(props) {
        super()
        //llamado a la api
    }

    frutas = [{
        id: 'askdjslad',
        nombre: 'Fresa',
        precio: 500
    },
    {
        id: 'aghjghjad',
        nombre: 'Manzana',
        precio: 400
    },
    {
        id: 'agyasj435d',
        nombre: 'Pera',
        precio: 750
    },
    {
        id: 'fgdfg',
        nombre: 'Banano',
        precio: 250
    },
    {
        id: '5asdhdf',
        nombre: 'Naranja',
        precio: 350
    }
]

    state = {
        total: 0
    }
    
    cambios = (cambio) => {
        console.log('desde el padre', cambio);
        this.setState({
            total: this.state.total + cambio.precio * (cambio.sumar?1:-1)
        })
    }

    render() {
        return (
           <>
                {
                    this.frutas.map(fruta => {
                        return <Fruta 
                            key={fruta.id} 
                            nombre={fruta.nombre} 
                            precio={fruta.precio}
                            bus={this.cambios}
                        />
                    })
                }

                <GranTotal total={this.state.total} />
           </>
        )
    }
}

export default App