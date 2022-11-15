import { useState, useEffect } from 'react';
import axios from "axios";



export default function useProvincia(IDCCAA : string) {
    type ProvinciaJSON = {
        IDPovincia: string;
        Provincia: string;
    };
    
    const [Provincias, setProvincias] = useState<ProvinciaJSON[]>([]);
      useEffect(() => {
        const getProvincias = async () => {
          try {
            const ProvinciaURL = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProvinciasPorComunidad/"+IDCCAA;
            const { data } = await axios.get(`${ProvinciaURL}`);
            const ProvinciasJSON: ProvinciaJSON[] = new Array<ProvinciaJSON>();
            data.map((Provincia: ProvinciaJSON) => {
              const ProvinciaJSON: ProvinciaJSON = {
                IDPovincia: Provincia.IDPovincia,
                Provincia: Provincia.Provincia,
              };
              ProvinciasJSON.push(ProvinciaJSON);
            });
            setProvincias(ProvinciasJSON);
          } catch (e) {
            console.error(e);
          }
        };
        getProvincias();
      }, [IDCCAA]);
    return Provincias;
}