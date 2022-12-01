import { IonContent, IonHeader, IonIcon, IonList, IonPage, IonTitle, IonImg, IonToolbar, IonItem, IonInput, IonButton, IonItemSliding, IonItemOptions, IonItemOption} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useCallback, useState, useRef } from 'react';
import { useStorage } from '../components/useStorage';
import { randomBytes, randomInt } from 'crypto';
import useFavourite from '../hooks/useFavourite';
import GasStationCard from '../components/GasStationCard';

const Tab1: React.FC = () => {
   const { gass, addGas , removeGas} = useStorage();
   const [place,setPlace] = useState('');
   const ionList = useRef(null as any);

   const createGas = async (id:string,id2:string,id3 : string) =>{
    await addGas(id,id2,id3);
    setPlace('');
   }

   const deleteGas = async(id: string) =>{
    removeGas(id);
    ionList.current.closeSlidingItems();
   }
  
  
   
   const FavouriteStations = useFavourite(gass);
   console.log("FavStationsJSON")
   console.log(FavouriteStations)
  
  
   return (
    <IonPage>
    <IonContent fullscreen>
    <IonImg className='logo' src="assets/images/logo.png" alt=""></IonImg> 
    <div>
      {FavouriteStations.map((Station, key) =>{
        return  <IonList ref={ionList}>
                <IonItemSliding key={key}><IonItem>
                  <GasStationCard gasStation={Station}/></IonItem>
                  <IonItemOptions side="start" onClick={() => deleteGas(Station.IDEESS)}>
                    <IonItemOption>
                        d
                    </IonItemOption>
                  </IonItemOptions>
                  </IonItemSliding>
            </IonList>
      })}
    </div>
        </IonContent>
    </IonPage>
  );
};

export default Tab1;


