import "./GasStationCard.css";
import logo from "./images/REPSOL.png";

export default function GasStationCard(gasStation: any) {
  gasStation = gasStation.gasStation;
  const direction: string =
    "https://www.google.com/maps/search/?api=1&query=" +
    gasStation.Latitud.replace(",", ".") +
    "%2C" +
    gasStation.Longitud.replace(",", ".");
  return (
    <div className="vinetapadre">
      <div className="imagecenter">
        <img className="gasStationLogo" src={logo}></img>
      </div>
      <div className="vinetahija">
        <h1 className="marca">{gasStation.Rótulo} </h1>
        <p className="combustible"> Precio: {gasStation.PrecioProducto} </p>
        <p className="direccion"> Direccion: {gasStation.Dirección}</p>
        <a href={direction} className="boton">
          Ir
        </a>
      </div>
    </div>
  );
}