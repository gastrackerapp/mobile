import { useState, useEffect } from "react";
import axios from "axios";

export default function useMunicipio(IDProvincia: string) {
  type MunicipioJSON = {
    IDMunicipio: string;
    Municipio: string;
  };

  const [Municipios, setMunicipios] = useState<MunicipioJSON[]>([]);
  useEffect(() => {
    const getMunicipios = async () => {
      try {
        const MunicipioURL =
          "	https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/" +
          IDProvincia;
        const { data } = await axios.get(`${MunicipioURL}`);
        const MunicipiosJSON: MunicipioJSON[] = new Array<MunicipioJSON>();
        data.map((Municipio: MunicipioJSON) => {
          const MunicipioJSON: MunicipioJSON = {
            IDMunicipio: Municipio.IDMunicipio,
            Municipio: Municipio.Municipio,
          };
          MunicipiosJSON.push(MunicipioJSON);
        });
        setMunicipios(MunicipiosJSON);
      } catch (e) {
        console.error(e);
      }
    };
    getMunicipios();
  }, [IDProvincia]);
  return Municipios;
}
