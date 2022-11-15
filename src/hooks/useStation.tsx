import { useState, useEffect } from 'react';
import axios from "axios";

export default function useStation(IDMunicipio : string | null, IDProducto : string | null) {
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
    };
    
    const [Stations, setStations] = useState<StationJSON[]>([]);
      useEffect(() => {
        const getStations = async () => {
          try {
            const StationURL = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipioProducto/"+IDMunicipio+"/"+IDProducto;
            let { data } = await axios.get(`${StationURL}`);
            const StationsJSON: StationJSON[] = new Array<StationJSON>();
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
              };
              StationsJSON.push(StationJSON);
            });
            setStations(StationsJSON);
          } catch (e) {
            console.error(e);
          }
        };
        getStations();
      }, [IDMunicipio,IDProducto]);
      return Stations.sort((a,b)=>{return parseFloat(a.PrecioProducto.split(',').join('.')) - parseFloat(b.PrecioProducto.split(',').join('.'))});
}