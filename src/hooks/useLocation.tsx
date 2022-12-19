import axios from "axios";
import { useEffect, useState } from "react";
import { Geoposition } from '@ionic-native/geolocation';

type resultType = {
  region: string;
  area: string;
  locality: string;
}


const useLocation = (position: Geoposition | undefined) => {
  const lat = position?.coords.latitude;
  const lng = position?.coords.longitude;
  console.log(lat);
  console.log(lng);
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
    }, [position])
    console.log(response?.locality)
  return response;
};

export default useLocation;
