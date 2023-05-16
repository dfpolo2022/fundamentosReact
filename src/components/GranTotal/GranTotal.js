import React from "react"
import Navegacion from '../Navegacion'

class GranTotal extends React.Component {

    render() {
        return (
            <>
                <Navegacion />
                <h1>TOTAL: {this.props.total}</h1>
            </>
        )
    }
}

export default GranTotal