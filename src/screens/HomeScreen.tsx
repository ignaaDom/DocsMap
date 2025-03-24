import { MapView, BtnMyLocation, FlorenciaLogo, SearchBar} from "../components"
import { DistanciaMinutos } from '../components/DisntanciaMinutos';

export const HomeScreen = () => {
    return (
        <div>
            <MapView></MapView>
            <BtnMyLocation></BtnMyLocation>
            <FlorenciaLogo></FlorenciaLogo>
            <SearchBar></SearchBar>
            <DistanciaMinutos></DistanciaMinutos>
        </div>
    )
}