import axios from "axios";
import { useEffect, useState } from "react";

type resultType = {
  region: string;
  area: string;
  locality: string;
}


const useLocation = (props: {lng: number, lat: number}) => {
  const { lng, lat } = props;
  const options = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
    params: { location: `${lat},${lng}`, language: 'es' },
    headers: {
      'X-RapidAPI-Key': '95b5125b4amsh88c3c2892f0d240p1652b8jsnd1ce29957c3a',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
  }

  const [response, setResponse] = useState<resultType>();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.request(options);
          setResponse(res.data.results[0]);
        } catch (err) {
          if (err instanceof Error) {
            return (err as Error).message;
          }
          return err;
        }
      }
      fetchData();
    }, [])
  return response;
};

export default useLocation;
