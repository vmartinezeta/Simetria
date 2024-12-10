import { useEffect } from "react"
import { useSimetria } from "./SimetriaContext"
import './App.css'
import Cell from "./components/Cell"
import Mensaje from "./components/Mensaje"

const Simetria = () => {
    const {intentos, leftCells, rightCells, crear } = useSimetria()

    useEffect(() => {
        crear()
    }, [])

    return <div className="app">
        <h1 className="intentos">intentos <span className="intentos__circulo">{intentos}</span></h1>
        <div className="main">
            <div className="tabla">
                {leftCells.map((cell, idx) => <Cell key={idx} cell={cell} />)}
            </div>
            <div className="tabla tabla__invertida">
                {rightCells.map((cell, idx) => <Cell key={idx} cell={cell} editable={false} /> )}
            </div>
        </div>
        <Mensaje />
    </div>
}

export default Simetria