import { useContext } from "react"
import { MapContext } from "../context"


export const DistanciaMinutos = () => {

    const { kms, minutes} = useContext( MapContext );

    return (
        <div className={`DistanciaMinutos-container `}>
            <h4 className="text-center">Datos de la ruta</h4>
            <hr />
            <div className={`DistanciaMinutos-container-kms ${(kms == 0) ? 'ocultar' : ''}`}>
                <p className="text-start text-wrap">Distancia: {kms}kms</p>
            </div>
            <div className={`DistanciaMinutos-container-minutes ${(minutes == 0) ? 'ocultar' : ''}`}>
                <p className="text-start text-wrap">Estimación: {minutes}min</p>
            </div>
        </div>
    )
}