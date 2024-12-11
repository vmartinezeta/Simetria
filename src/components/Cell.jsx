import { useSimetria } from "../SimetriaContext"


const Cell = ({ cell, editable = true }) => {
    const { completado, updateCell } = useSimetria()
    const estado = ["cell"]
    if (cell.marcado && cell.correcta) {
        estado.push("cell__marcado")
    } else if (editable && cell.marcado && !cell.correcta) {
        estado.push("cell__fail")
    }

    const onUpdateCell = (cell) => {
        if (completado()) {
            return
        }
        cell.marcado = true
        updateCell(cell)
    }

    return <div
        onClick={() => editable ? onUpdateCell(cell) : undefined}
        className={estado.join(" ")}></div>
}

export default Cell
