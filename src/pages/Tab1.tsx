import { IonContent, IonHeader, IonIcon, IonList, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonItemSliding, IonItemOptions, IonItemOption} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import CapacitorTest from '../components/CapacitorTest'
import { useCallback, useState, useRef } from 'react';
import { useStorage } from '../components/useStorage';
const Tab1: React.FC = () => {
   const { gass, addGas , removeGas} = useStorage();
   const [place,setPlace] = useState('');
   const ionList = useRef(null as any);

   const createGas = async () =>{
    await addGas(place);
    setPlace('');
   }

   const deleteGas = async(id: number) =>{
    //TODO
    removeGas(id);
    ionList.current.closeSlidingItems();
   }
  
  
  
  
   return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My gas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Gas Stations</IonTitle>
            <IonItem>
            <IonInput value={place} onIonChange={(e) => setPlace(e.detail.value!)} placeholder='Repsol'>
            </IonInput>
            <IonButton slot='end' onClick={() => createGas()} fill="clear">Añadir</IonButton>
            </IonItem>
            
            <IonList ref={ionList}>
              {gass.map((gas, key) =>(
                <IonItemSliding key={key}><IonItem>
                  {gas.place} </IonItem>
                  <IonItemOptions side="start" onClick={() => deleteGas(gas.id)}>
                    <IonItemOption>
                        Borrar
                    </IonItemOption>
                  </IonItemOptions>
                  </IonItemSliding>
              ))}
            </IonList>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Mis favoritos"/>
        </IonContent>
    </IonPage>
  );
};

export default Tab1;
