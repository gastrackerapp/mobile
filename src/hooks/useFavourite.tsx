import { useState, useEffect } from 'react';
import axios from "axios";
import {GasItem} from "../components/useStorage"

let FavouriteStations: StationJSON[] = new Array<StationJSON>();

type StationJSON = {
  Dirección: string
  Latitud: string;
  Longitud: string
  Horario: string
  PrecioProducto: string;
  Rótulo: string;
  IDEESS: string;
  IDMunicipio: string;
  IDProvincia: string;
  IDCCAA: string;
  IDProducto: string | null;
};

function checkGas(gasStation:GasItem, gasStationDictionary:any) {
    if (!(gasStation.IDMunicipio in gasStationDictionary)) {
       gasStationDictionary[gasStation.IDMunicipio] = {IDEESSS:[gasStation.IDEESS],IDProducto: gasStation.IDProducto}
    } else {
       var value = gasStationDictionary[gasStation.IDMunicipio];
       value.IDEESSS.push(gasStation.IDEESS);
       gasStationDictionary[gasStation.IDMunicipio] = value;
    }
}

interface IFavouriteMunicipioStations {
    IDEESSS:string[];
    IDProducto: string;
 }

function GetFavStations(IDMunicipio: String, value:IFavouriteMunicipioStations, favouriteGasStations:GasItem[]){
  const StationsJSON: StationJSON[] = new Array<StationJSON>();
  const getStations = async () => {
    try {
      const StationURL = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipioProducto/"+IDMunicipio+"/"+value.IDProducto;
      let { data } = await axios.get(`${StationURL}`);
      data = data.ListaEESSPrecio
      data = JSON.parse(JSON.stringify(data).split('"Longitud (WGS84)":').join('"Longitud":'))
      data.map((Station: StationJSON) => {
        const StationJSON: StationJSON = {
          Dirección: Station.Dirección,
          Latitud: Station.Latitud,
          Longitud: Station.Longitud,
          Horario : Station.Horario,
          PrecioProducto : Station.PrecioProducto,
          Rótulo : Station.Rótulo,
          IDEESS : Station.IDEESS,
          IDMunicipio : Station.IDMunicipio,
          IDProvincia : Station.IDProvincia,
          IDCCAA : Station.IDCCAA,
          IDProducto: value.IDProducto,
        };
        StationsJSON.push(StationJSON);});
    }catch (e) {
      console.error(e);
    }
    console.log("StationsJSON on " + IDMunicipio)
    console.log(StationsJSON)
    console.log("resulta on " + IDMunicipio)
    const resulta = StationsJSON.filter(Station => value.IDEESSS.includes(Station.IDEESS));
    console.log(resulta)
    FavouriteStations.concat(resulta)
    resulta.forEach(reslt => FavouriteStations.push(reslt));
    console.log("FavStationsJSON on " + IDMunicipio)
    console.log(FavouriteStations)
    return StationsJSON
  };
  return getStations();
}

export default function useFavourite(favouriteGasStations:GasItem[]) {
  useEffect(() => {
    let gasStationDictionary: { [IDMunicipio: string]: IFavouriteMunicipioStations } = {};

    favouriteGasStations.map((gas, key) =>(
            checkGas(gas,gasStationDictionary)
            ))
    
        
    console.log("gasStationDictionary")
    console.log(gasStationDictionary)

    Object.entries(gasStationDictionary).forEach(
      ([key, value]) => (GetFavStations(key,value,favouriteGasStations)
      )
    );
  }, [favouriteGasStations,FavouriteStations]);
  return FavouriteStations.sort((a,b)=>{return parseFloat(a.PrecioProducto.split(',').join('.')) - parseFloat(b.PrecioProducto.split(',').join('.'))});
}