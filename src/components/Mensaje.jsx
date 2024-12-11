import { useSimetria } from "../SimetriaContext"

function Mensaje() {
    const {finalizo, ganador} = useSimetria()

    if (ganador) {
        return <h1 className="mensaje">Haz Ganado.</h1>
    } else if (finalizo()) {
        return <h1 className="mensaje">Haz perdido.</h1>
    }
    return null
}

export default Mensaje