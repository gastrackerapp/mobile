import { useState, useEffect } from 'react';
import axios from "axios";



export default function useCCAA() {
    type CCAAJSON = {
        IDCCAA: string;
        CCAA: string;
    };
    
    const [CCAAS, setCCAAS] = useState<CCAAJSON[]>([]);
      useEffect(() => {
        const getCCAAS = async () => {
          try {
            const CCAAURL = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/";
            const { data } = await axios.get(`${CCAAURL}`);
            const CCAASJSON: CCAAJSON[] = new Array<CCAAJSON>();
            data.map((CCAA: CCAAJSON) => {
              const CCAAJSON: CCAAJSON = {
                IDCCAA: CCAA.IDCCAA,
                CCAA: CCAA.CCAA,
              };
              CCAASJSON.push(CCAAJSON);
            });
            setCCAAS(CCAASJSON);
          } catch (e) {
            console.error(e);
          }
        };
        getCCAAS();
      }, []);
    
    return CCAAS;
}