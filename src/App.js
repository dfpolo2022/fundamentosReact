import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pagina1 from './components/Pagina1'
import Pagina2 from './components/Pagina2'

class App extends React.Component {

    

    constructor(props) {
        super()
        //llamado a la api
    }

    // frutas = [{
    //     id: 'askdjslad',
    //     nombre: 'Fresa',
    //     precio: 500
    // },
    // {
    //     id: 'aghjghjad',
    //     nombre: 'Manzana',
    //     precio: 400
    // },
    // {
    //     id: 'agyasj435d',
    //     nombre: 'Pera',
    //     precio: 750
    // },
    // {
    //     id: 'fgdfg',
    //     nombre: 'Banano',
    //     precio: 250
    // },
    // {
    //     id: '5asdhdf',
    //     nombre: 'Naranja',
    //     precio: 350
    // }]

    state = {
        total: 0
    }

    render() {
        return (
           <>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Pagina1 />} />
                        <Route path='/calendario' element={<Pagina2 />} />
                    </Routes>
                </BrowserRouter>
           </>
        )
    }
}

export default App

/*
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
*/ 