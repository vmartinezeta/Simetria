import { createContext, useContext, useRef, useState } from "react";

const SimetriaContext = createContext()

export function useSimetria() {
    const context = useContext(SimetriaContext)
    if (!context) {
        throw new TypeError("falta un contexto")
    }
    return context
}


let celdasMarcadas = 5

export default function SimetriaProvider({ children }) {
    const [leftCells, setLeftCells] = useState([])
    const [rightCells, setRightCells] = useState([])
    const [intentos, setIntentos] = useState(5)
    const [tiempo, setTiempo] = useState(30)
    const [nivel, setNivel] = useState(0)
    const [ganador, setGanador] = useState(false)
    const timer = useRef(null)

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
        while (randoms.length < celdasMarcadas) {
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
        if (ultimoNivel()) return
        const siguiente = nivel + 1
        celdasMarcadas = siguiente*5 + 5
        setNivel(siguiente)
    }

    const ultimoNivel = () => {
        return nivel === 2
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

    const finalizo = () => {
        return leftCells.filter(cell => cell.marcado && !cell.correcta).length === celdasMarcadas
        || leftCells.filter(cell =>cell.marcado && cell.correcta).length === celdasMarcadas
            || intentos === 0 || tiempo === 0
    }

    const hayGanador = () => {
       const ganador = leftCells.filter(cell =>cell.marcado && cell.correcta).length === celdasMarcadas
       setGanador(ganador)
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
            ultimoNivel,
            reset,
            siguienteNivel,
            hayGanador,
            updateCell,
            finalizo,
            updateTiempo
        }}
    >
        {children}
    </SimetriaContext.Provider>
}