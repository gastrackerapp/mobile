import "./Tab3.css";
import React from "react";
import { trash, star } from "ionicons/icons";
import {
  IonContent,
  IonIcon,
  IonPage,
  IonItem,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import { useState, useRef } from "react";
import useStation from "../hooks/useStation";
import useLocation from "../hooks/useLocation";
import useProducto from "../hooks/useProducto";
import { useStorage } from "../hooks/useStorage";
import GasStationCard from "../components/GasStationCard";

const Tab3: React.FC = () => {

  /////////////////////////Location Hook/////////////////////////
  const location = {
    //TRAER ESTOS DATOS DE LA LOCALIZACION DEL USUARIO
    lat: 37.8132667,
    lng: -5.0137913,
  };

  const response = useLocation(location);
  //////////////////////////////////////////////////////////////

  /////////////////////Conditional rendering/////////////////////
  const getSearchingInitialState = () => {
    const Searching = false;
    return Searching;
  };

  const [Searching, setSearching] = useState(getSearchingInitialState);

  const handleSearchingChange = () => {
    setSearching(!Searching);
  };
  //////////////////////////////////////////////////////////////

  ////////////////////////Producto Hook////////////////////////
  const getIDProductoInitialState = () => {
    const IDProducto = "-";
    return IDProducto;
  };

  const [IDProducto, setIDProducto] = useState(getIDProductoInitialState);

  const Productos = useProducto();

  const handleProductoChange = (e: any) => {
    setIDProducto(e.target.value);
  };
  //////////////////////////////////////////////////////////////

  //////////////////////////EESS Hook//////////////////////////
  const getIDEESSInitialState = () => {
    const IDEESS = "-";
    return IDEESS;
  };

  const [IDEESS, setIDEESS] = useState(getIDEESSInitialState);

  const handleEESSChange = (e: any) => {
    setIDEESS(e.target.value);
  };
  //////////////////////////////////////////////////////////////

  ////////////////////////Stations Hook////////////////////////
  const Stations = useStation("2063", IDProducto);
  ////////////////////////////////////////////////////////////

  //////////////////////////DB Hook//////////////////////////
  const { gass, addGas, removeGas } = useStorage();

  const [place, setPlace] = useState("");

  const ionList = useRef(null as any);

  const createGas = async (id1: string, id2: string, id3: string | null) => {
    await addGas(id1, id2, id3);
    setPlace("");
  };

  const deleteGas = async (id: string) => {
    removeGas(id);
    ionList.current.closeSlidingItems();
  };
  /////////////////////////////////////////////////////////

  if (!Searching) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <header className="App-header">
            <img
              className="App-image"
              src="assets/images/logo.png"
              alt="logo"
            ></img>
          </header>
          <body className="App-body">
            <div className="App-formcolumn">
              <div className="Form-block">
                <p className="Form-title">
                  <b>
                    <i>GASOLINERAS CERCA DE TI</i>
                  </b>
                </p>
              </div>
              <img
                className="Find-nearby-image"
                src="assets/images/nearby.png"
                alt="logo"
              ></img>
              <div className="Form-block">
                <p className="Form-title">
                  <b>
                    <i>COMBUSTIBLE</i>
                  </b>
                </p>
                <select
                  value={IDProducto}
                  className="Form-select"
                  onChange={handleProductoChange}
                >
                  <option value={"-"}>-</option>;
                  {Productos.map((Producto) => {
                    return (
                      <option value={Producto.IDProducto}>
                        {Producto.NombreProducto}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="Form-block">
                <p className="Form-title">
                  <b>
                    <i>ESTACIÓN DE SERVICIO</i>
                  </b>
                </p>
                <select
                  value={IDEESS}
                  className="Form-select"
                  onChange={handleEESSChange}
                >
                  <option value={"-"}>-</option>;
                  <option value={"BP"}>BP</option>;
                  <option value={"CEPSA"}>Cepsa</option>;
                  <option value={"GALP"}>Galp</option>;
                  <option value={"PETRONOR"}>Petronor</option>;
                  <option value={"PLENOIL"}>Plenoil</option>;
                  <option value={"REPSOL"}>Repsol</option>;
                </select>
              </div>
              <br></br>
              <div className="Form-block">
                <button
                  className="Form-button"
                  onClick={() => handleSearchingChange()}
                >
                  <b>
                    <i>BUSCAR</i>
                  </b>
                </button>
              </div>
            </div>
          </body>
        </IonContent>
      </IonPage>
    );
  } else {
    return (
      <IonPage>
        <IonContent fullscreen>
          <header className="App-header">
            <img
              className="App-image"
              src="assets/images/logo.png"
              alt="logo"
            ></img>
          </header>
          <div>
            <div className="First-Row">
              <p className="Stations-Title">
                <b>
                  <i>RESULTADOS</i>
                </b>
              </p>
              <button
                className="New-Search-button"
                onClick={() => handleSearchingChange()}
              >
                <b>
                  <i>NUEVA BÚSQUEDA</i>
                </b>
              </button>
            </div>
            {Stations.map((Station, key) => {
              if (
                Station.Rótulo.search(IDEESS.toUpperCase()) !== -1 ||
                IDEESS === "-"
              ) {
                return (
                  <IonList ref={ionList}>
                    <IonItemSliding key={key}>
                      <IonItem>
                        <GasStationCard gasStation={Station} />
                      </IonItem>
                      <IonItemOptions
                        side="start"
                        onClick={() =>
                          createGas(
                            Station.IDEESS,
                            Station.IDMunicipio,
                            Station.IDProducto
                          )
                        }
                      >
                        <IonItemOption>
                          <IonIcon icon={star} />
                        </IonItemOption>
                      </IonItemOptions>
                      <IonItemOptions
                        side="end"
                        onClick={() => deleteGas(Station.IDEESS)}
                      >
                        <IonItemOption>
                          <IonIcon icon={trash} />
                        </IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                  </IonList>
                );
              }
            })}
          </div>
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab3;
