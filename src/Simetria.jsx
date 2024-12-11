import { useEffect } from "react"
import { useSimetria } from "./SimetriaContext"
import './App.css'
import Cell from "./components/Cell"
import Mensaje from "./components/Mensaje"

const Simetria = () => {
    const { reset, ganador, siguienteNivel, hayGanador, nivel, updateTiempo, timer, tiempo, completado, intentos, leftCells, rightCells, crear } = useSimetria()

    useEffect(() => {
        crear()
    }, [])

    useEffect(() => {
        if (nivel===3) return
        timer.current = setInterval(() => {
            updateTiempo()
        }, 1000)

        return () => {
            clearInterval(timer.current)
        }
    }, [tiempo, ganador])


    useEffect(() => {
        let timer = null
        if (hayGanador()&& nivel<3) {
            siguienteNivel()
            timer = setInterval(() => {
                reset()
            }, 3000)
        }

        return () => {
            clearInterval(timer)
        }
    }, [ganador])

    const rellenarDecena = (value, defaultValue = "0") => {
        if (value < 10) {
            return `${defaultValue}${value}`
        }
        return value
    }

    const formatearTiempo = () => {
        return `00:${rellenarDecena(tiempo)}`
    }

    return <div className="app">
        <div className="topbar">
            <h1 className="intentos">intentos <span className="intentos__circulo">{intentos}</span></h1>
            <h1 className="nivel">{nivel}</h1>
            <div className="tiempo">
                <h1 className="tiempo__titulo">{formatearTiempo()}</h1>
            </div>
        </div>
        <div className="main">
            <div className="tabla">
                {leftCells.map((cell, idx) => <Cell key={idx} cell={cell} />)}
            </div>
            <div className="tabla tabla__invertida">
                {rightCells.map((cell, idx) => <Cell key={idx} cell={cell} editable={false} />)}
            </div>
        </div>
        <Mensaje />
    </div>
}

export default Simetria