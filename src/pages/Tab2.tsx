import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonImg, IonItem,IonInput, IonButton, IonList, IonItemSliding,IonItemOptions,IonItemOption } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { useStorage } from '../components/useStorage';
import { useCallback, useState, useRef } from 'react';
import GasStationCard from '../components/GasStationCard';
import React from 'react';
import useCCAA from "../hooks/useCCAA";
import useProvincia from "../hooks/useProvincia";
import useMunicipio from "../hooks/useMunicipio";
import useProducto from "../hooks/useProducto";
import useStation from "../hooks/useStation";



const Tab2: React.FC = () => {

  const getSearchingInitialState = () => {
    const Searching = false;
    return Searching;
  };

  const [Searching, setSearching] = useState(getSearchingInitialState);
  const handleSearchingChange = () => {
    setSearching(!Searching);
  };


  const getIDCCAAInitialState = () => {
    const IDCCAA = "01";
    return IDCCAA;
  };

  const [IDCCAA, setIDCCAA] = useState(getIDCCAAInitialState);
  const CCAAS = useCCAA();
  const handleCCAAChange = (e: any) => {
    setIDCCAA(e.target.value);
    setIDProvincia("-");
    setIDMunicipio("-");
  };

  
  const getIDProvinciaInitialState = () => {
    const IDProvincia = "-";
    return IDProvincia;
  };
  
  const [IDProvincia, setIDProvincia] = useState(getIDProvinciaInitialState);
  const Provincias = useProvincia(IDCCAA);
  const handleProvinciaChange = (e: any) => {
    setIDProvincia(e.target.value);
    setIDMunicipio("-");
  };

  const getIDMunicipioInitialState = () => {
    const IDMunicipio = "-";
    return IDMunicipio;
  };
  
  const [IDMunicipio, setIDMunicipio] = useState(getIDMunicipioInitialState);
  const Municipios = useMunicipio(IDProvincia);
  const handleMunicipioChange = (e: any) => {
    setIDMunicipio(e.target.value);
  };

  const getIDProductoInitialState = () => {
    const IDProducto = "-";
    return IDProducto;
  };
  
  const [IDProducto, setIDProducto] = useState(getIDProductoInitialState);
  const Productos = useProducto();
  const handleProductoChange = (e: any) => {
    setIDProducto(e.target.value);
  };

  const getIDEESSInitialState = () => {
    const IDEESS = "-";
    return IDEESS;
  };
  
  const [IDEESS, setIDEESS] = useState(getIDEESSInitialState);
  const handleEESSChange = (e: any) => {
    setIDEESS(e.target.value);
  };

  //////////////////////////////////////
  const { gass, addGas , removeGas} = useStorage();
  const [place,setPlace] = useState('');
  const ionList = useRef(null as any);
  
  const createGas = async (id1: number, id2:number) =>{
    await addGas(id1,id2);
    setPlace('');
   }

   const deleteGas = async(id: number) =>{
    //TODO
    removeGas(id);
    ionList.current.closeSlidingItems();
   }
   /////////////////////////////////////////
  const Stations = useStation(IDMunicipio, IDProducto);

   if (!Searching) {    
  return (
    <IonPage>
      <IonContent fullscreen>
      <IonImg className='logo' src="assets/images/logo.png" alt=""></IonImg>
      <div className="Form-block">
        <p className="Form-title">
          <b>
            <i>COMUNIDAD AUTÓNOMA</i>
          </b>
        </p>
        <select value={IDCCAA} onChange={handleCCAAChange}>
          {CCAAS.map((CCAA) => {
            return <option value={CCAA.IDCCAA}>{CCAA.CCAA}</option>;
          })}
        </select>
      </div>
      <div className="Form-block">
        <p className="Form-title">
          <b>
            <i>PROVINCIA</i>
          </b>
        </p>
        <select value={IDProvincia} onChange={handleProvinciaChange}>
        <option value={"-"}>-</option>;
          {Provincias.map((Provincia) => {
            return <option value={Provincia.IDPovincia}>{Provincia.Provincia.charAt(0)+Provincia.Provincia.slice(1).toLowerCase()}</option>;
          })}
        </select>
      </div>
      <div className="Form-block">
        <p className="Form-title">
          <b>
            <i>MUNICIPIO</i>
          </b>
        </p>
        <select value={IDMunicipio} onChange={handleMunicipioChange}>
        <option value={"-"}>-</option>;
          {Municipios.map((Municipio) => {
            return <option value={Municipio.IDMunicipio}>{Municipio.Municipio}</option>;
          })}
        </select>
      </div>
      <div className="Form-block">
        <p className="Form-title">
          <b>
            <i>COMBUSTIBLE</i>
          </b>
        </p>
        <select value={IDProducto} onChange={handleProductoChange}>
        <option value={"-"}>-</option>;
          {Productos.map((Producto) => {
            return <option value={Producto.IDProducto}>{Producto.NombreProducto}</option>;
          })}
        </select>
      </div>
      <div className="Form-block">
        <p className="Form-title">
          <b>
            <i>ESTACIÓN DE SERVICIO</i>
          </b>
        </p>
        <select value={IDEESS} onChange={handleEESSChange}>
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
      <div>
        <button className="App-button" onClick={() => handleSearchingChange()}>
          <b>
            <i>BUSCAR</i>
          </b>
        </button>
      </div>
      </IonContent>
    </IonPage>
  );}
  else{
    return (
    <IonPage>
    <IonContent fullscreen>
    <IonImg className='logo' src="assets/images/logo.png" alt=""></IonImg>
    <div>
      <button className="App-button" onClick={() => handleSearchingChange()}>
        <b>
          <i>NUEVA BUSQUEDA</i>
        </b>
      </button>
      {Stations.map((Station) => {
            if (
              Station.Rótulo.search(IDEESS.toUpperCase()) != -1 ||
              IDEESS === "-"
            ) {
              return <GasStationCard gasStation={Station} />;
            }
          })}
    </div>
    </IonContent>
  </IonPage>
  );}
};

export default Tab2;
