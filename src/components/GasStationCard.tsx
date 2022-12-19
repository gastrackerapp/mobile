import "./GasStationCard.css";
import Bp from "./images/bp.png";
import Cepsa from "./images/cepsa.png";
import Galp from "./images/galp.png";
import Petroil from "./images/petroil.png";
import Petronor from "./images/petronor.png";
import Repsol from "./images/repsol.png";
import sinLogo from "./images/sinLogo.png";

export default function GasStationCard(gasStation: any) {
  gasStation = gasStation.gasStation;
  const getLogo = (Rótulo: String) => {
    let logo = sinLogo;
    if (Rótulo.search("BP") !== -1) {
      logo = Bp;
    } else if (Rótulo.search("CEPSA") !== -1) {
      logo = Cepsa;
    } else if (Rótulo.search("GALP") !== -1) {
      logo = Galp;
    } else if (Rótulo.search("PETROIL") !== -1) {
      logo = Petroil;
    } else if (Rótulo.search("PETRONOR") !== -1) {
      logo = Petronor;
    } else if (Rótulo.search("REPSOL") !== -1) {
      logo = Repsol;
    }
    return logo;
  };

  const direction: string =
    "https://www.google.com/maps/search/?api=1&query=" +
    gasStation.Latitud.replace(",", ".") +
    "%2C" +
    gasStation.Longitud.replace(",", ".");

  return (
    <div className="GasStationCard">
      <img className="GasStationLogo" src={getLogo(gasStation.Rótulo)}></img>
      <div className="GasStationInfo">
        <div className="CardFirstRow">
          <p className="GasStationLabel">{gasStation.Rótulo} </p>
          <p className="GasStationFuelPrice">
            {" "}
            <b>Precio:</b> {gasStation.PrecioProducto}{" "}
          </p>
        </div>
        <div className="CardSecondRow">
          <p className="GasStationAddress">
            {" "}
            <b>Direccion:</b> {gasStation.Dirección}
          </p>
        </div>
        <div className="CardThirdRow">
          <a href={direction} className="GasStationButton">
            <b>
              <i>IR</i>
            </b>
          </a>
        </div>
      </div>
    </div>
  );
}
