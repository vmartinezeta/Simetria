import { useSimetria } from "../SimetriaContext"


const Cell = ({ cell, editable = true }) => {
    const {hayGanador, finalizo, updateCell } = useSimetria()
    const estado = ["cell"]
    if (cell.marcado && cell.correcta) {
        estado.push("cell__marcado")
    } else if (editable && cell.marcado && !cell.correcta) {
        estado.push("cell__fail")
    }

    const onUpdateCell = (cell) => {
        if (finalizo()) {
            return
        }
        cell.marcado = true
        hayGanador()
        updateCell(cell)
    }

    return <div
        onClick={() => editable && !finalizo() ? onUpdateCell(cell) : undefined}
        className={estado.join(" ")}></div>
}

export default Cell
