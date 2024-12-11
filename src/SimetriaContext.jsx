import { createContext, useContext, useRef, useState } from "react";

const SimetriaContext = createContext()

export function useSimetria() {
    const context = useContext(SimetriaContext)
    if (!context) {
        throw new TypeError("falta un contexto")
    }
    return context
}

const CELDAS_MARCADAS = 10


export default function SimetriaProvider({ children }) {
    const [leftCells, setLeftCells] = useState([])
    const [rightCells, setRightCells] = useState([])
    const [intentos, setIntentos] = useState(5)
    const [tiempo, setTiempo] = useState(30)
    const timer = useRef(null)
    const [nivel, setNivel] = useState(1)
    const [ganador, setGanador] = useState(false)

    const crear = () => {
        const vector = []
        for (let i = 1; i <= 25; i++) {
            vector.push({
                numero: i,
                marcado: false,
                correcta: false
            })
        }

        const randoms = []
        while (randoms.length < CELDAS_MARCADAS) {
            const random = Math.ceil(Math.random() * 16)
            if (!randoms.includes(random)) {
                randoms.push(random)
            }
        }

        vector.forEach((cell, index, vector) => {
            if (randoms.includes(cell.numero)) {
                vector[index] = {
                    ...cell,
                    correcta: true
                }
            }
        })
        setLeftCells(vector)
        setRightCells(vector.map(cell => ({ ...cell, marcado: true })))
    }


    const siguienteNivel = () => {
        if (nivel === 3) return
        setNivel(nivel + 1)
    }

    const updateTiempo = () => {
        if (tiempo === 0) return
        setTiempo(tiempo - 1)
    }

    const updateCell = (cell) => {
        if (!cell.correcta && intentos > 0) {
            setIntentos(intentos - 1)
        }
        const idx = leftCells.findIndex(c => c.numero === cell.numero)
        leftCells[idx] = cell
        setLeftCells([...leftCells])
    }

    const completado = () => {
        return leftCells.filter(cell => cell.marcado && cell.correcta).length === CELDAS_MARCADAS
            || intentos === 0 || tiempo === 0
    }

    const hayGanador = () => {
        const ganador = completado() && intentos > 0 && tiempo>0
        setGanador(ganador)
        return ganador
    }

    const reset = () => {
        crear()
        setGanador(false)
        setIntentos(5)
        setTiempo(30)
    }

    return <SimetriaContext.Provider
        value={{
            tiempo,
            intentos,
            ganador,
            leftCells,
            rightCells,
            timer,
            nivel,
            crear,
            reset,
            siguienteNivel,
            hayGanador,
            updateCell,
            completado,
            updateTiempo
        }}
    >
        {children}
    </SimetriaContext.Provider>
}