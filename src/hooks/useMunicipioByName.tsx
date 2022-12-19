import axios from "axios";
import all from './municipios.json'
import { useState, useEffect } from "react";

export default function useMunicipioByName(Name: string | undefined) {
  type MunicipioJSON = {
    IDMunicipio: string;
    Municipio: string;
  };

  const [Municipios, setMunicipios] = useState<MunicipioJSON[]>([]);
  useEffect(() => {
    const getMunicipios = async () => {
      try {
        const data = all;
        console.log(data);
        const MunicipiosJSON: MunicipioJSON[] = new Array<MunicipioJSON>();
        setMunicipios(data.filter(Municipio => Municipio.Municipio === Name));
      } catch (e) {
        console.error(e);
      }
    };
    getMunicipios();
  }, [Name]);
  return Municipios;
}
