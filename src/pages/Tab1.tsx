import { trash } from "ionicons/icons";
import {
  IonContent,
  IonIcon,
  IonList,
  IonPage,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import "./Tab1.css";
import { useRef } from "react";
import { useStorage } from "../components/useStorage";
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
  const FavouriteStations = useFavourite(gass);
  /////////////////////////////////////////////////////////

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
          <div className="First-Row">
            <p className="Stations-Title">
              <b>
                <i>GASOLINERAS FAVORITAS</i>
              </b>
            </p>
          </div>
          {FavouriteStations.map((Station, key) => {
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
