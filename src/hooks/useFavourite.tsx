import { useState, useEffect } from "react";
import axios from "axios";
import { GasItem } from "./useStorage";


type StationJSON = {
  Dirección: string;
  Latitud: string;
  Longitud: string;
  Horario: string;
  PrecioProducto: string;
  Rótulo: string;
  IDEESS: string;
  IDMunicipio: string;
  IDProvincia: string;
  IDCCAA: string;
  IDProducto: string | null;
};

function checkGas(gasStation: GasItem, gasStationDictionary: any) {
  if (!(gasStation.IDMunicipio in gasStationDictionary)) {
    gasStationDictionary[gasStation.IDMunicipio] = {
      IDEESSS: [gasStation.IDEESS],
      IDProducto: gasStation.IDProducto,
    };
  } else {
    var value = gasStationDictionary[gasStation.IDMunicipio];
    value.IDEESSS.push(gasStation.IDEESS);
    gasStationDictionary[gasStation.IDMunicipio] = value;
  }
}

interface IFavouriteMunicipioStations {
  IDEESSS: string[];
  IDProducto: string;
}

let FavouriteStations: StationJSON[] = new Array<StationJSON>();
function GetFavStations(
  IDMunicipio: String,
  value: IFavouriteMunicipioStations,
  favouriteGasStations: GasItem[]
) {
  const getStations = async () => {
    const StationsJSON: StationJSON[] = new Array<StationJSON>();
    try {
      const StationURL =
        "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipioProducto/" +
        IDMunicipio +
        "/" +
        value.IDProducto;
      let { data } = await axios.get(`${StationURL}`);
      data = data.ListaEESSPrecio;
      data = JSON.parse(
        JSON.stringify(data).split('"Longitud (WGS84)":').join('"Longitud":')
      );
      data.map((Station: StationJSON) => {
        const StationJSON: StationJSON = {
          Dirección: Station.Dirección,
          Latitud: Station.Latitud,
          Longitud: Station.Longitud,
          Horario: Station.Horario,
          PrecioProducto: Station.PrecioProducto,
          Rótulo: Station.Rótulo,
          IDEESS: Station.IDEESS,
          IDMunicipio: Station.IDMunicipio,
          IDProvincia: Station.IDProvincia,
          IDCCAA: Station.IDCCAA,
          IDProducto: value.IDProducto,
        };
        StationsJSON.push(StationJSON);
      });
    } catch (e) {
      console.error(e);
    }
    FavouriteStations = StationsJSON.filter((Station) =>
      value.IDEESSS.includes(Station.IDEESS)
    );
    return FavouriteStations;
  };
  return getStations();
}

export default function useFavourite(favouriteGasStations: GasItem[]) {
  console.log("USEFAVOURITE #1",favouriteGasStations)
  useEffect(() => {
    let gasStationDictionary: {
      [IDMunicipio: string]: IFavouriteMunicipioStations;
    } = {};

    favouriteGasStations.map((gas, key) => checkGas(gas, gasStationDictionary));

    Object.entries(gasStationDictionary).forEach(([key, value]) =>
      GetFavStations(key, value, favouriteGasStations)
    );
  }, [favouriteGasStations]);
  return FavouriteStations.sort((a, b) => {
    return (
      parseFloat(a.PrecioProducto.split(",").join(".")) -
      parseFloat(b.PrecioProducto.split(",").join("."))
    );
  });
}
