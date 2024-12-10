import { useSimetria } from "../SimetriaContext"

const Mensaje = () => {
    const {completado, hayGanador} = useSimetria()

    if (completado() && hayGanador()) {
        return <h1 className="mensaje">Haz Ganado.</h1>
    } else if (completado() && !hayGanador()) {
        return <h1 className="mensaje">Haz perdido.</h1>
    }
    return null
}

export default Mensaje
