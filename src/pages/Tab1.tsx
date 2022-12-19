import "./Tab1.css";
import {
  IonContent,
  IonIcon,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  IonPage,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import { useRef } from "react";
import { trash } from "ionicons/icons";
import { useStorage } from "../hooks/useStorage";
import useFavourite from "../hooks/useFavourite";
import GasStationCard from "../components/GasStationCard";

const Tab1: React.FC = () => {
  //////////////////////////DB Hook//////////////////////////
  const ionList = useRef(null as any);

  const { gass, removeGas } = useStorage();

  const deleteGas = async (id: string) => {
    removeGas(id);
    ionList.current.closeSlidingItems();
  };
  /////////////////////////////////////////////////////////

  //////////////////////Stations  Hook//////////////////////
  /////////////////////////////////////////////////////////
  
  const FavouriteStations = useFavourite(gass);

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      console.log("HOLA",FavouriteStations)
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <header className="App-header">
          <img
            className="App-image"
            src="assets/images/logo.png"
            alt="logo"
          ></img>
        </header>
        <div>
        <IonRefresher slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
          <div className="First-Row">
            <p className="Stations-Title">
              <b>
                <i>GASOLINERAS FAVORITAS</i>
              </b>
            </p>
          </div>
          {FavouriteStations.map((Station: any, key: any) => {
            return (
              <IonList ref={ionList}>
                <IonItemSliding key={key}>
                  <IonItem>
                    <GasStationCard gasStation={Station} />
                  </IonItem>
                  <IonItemOptions
                    side="end"
                    onClick={() => deleteGas(Station.IDEESS)}
                  >
                    <IonItemOption>
                      <IonIcon icon={trash} />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              </IonList>
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
