import { createContext, useContext, useState } from "react";

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
            || intentos === 0
    }

    const hayGanador = () => {
        return intentos !== 0
    }

    return <SimetriaContext.Provider
        value={{
            intentos,
            crear,
            leftCells,
            rightCells,
            hayGanador,
            updateCell,
            completado
        }}
    >
        {children}
    </SimetriaContext.Provider>
}