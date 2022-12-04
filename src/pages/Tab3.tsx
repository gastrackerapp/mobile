import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import useLocation from "../hooks/useLocation";
import GeolocationButton from '../components/Geolocationbutton';

const Tab3: React.FC = () => {
  const location = {
    //TRAER ESTOS DATOS DE LA LOCALIZACION DEL USUARIO 
    lat: 37.8132667, 
    lng: -5.0137913
  }
  const response = useLocation(location);
  return (
    <IonPage>
      <IonContent fullscreen>
        <h1>{response?.locality}</h1>
        <h1>{response?.region}</h1>
        <h1>{response?.area}</h1>
      </IonContent>

      <GeolocationButton ></GeolocationButton>
    </IonPage>
  );                                                                           
};

export default Tab3;