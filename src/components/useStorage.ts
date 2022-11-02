import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage';

const GAS_KEY = 'my-gas'

export interface GasItem {
   id: number;
   place: string;
   whatever: string;

}
export function useStorage(){
const [store, setStore] = useState<Storage>();
const [gass,setGas] = useState<GasItem[]>([]);

useEffect(() => {
        const initStorage = async () =>{
        const newStore = new Storage({
            name:'nickdb'
        });
        const  store =await newStore.create();
        setStore(store);
        const storedGas = await store.get(GAS_KEY) || [];    
        setGas(storedGas);
        console.log('LOADED ', storedGas);
        
    }
        initStorage(); 
    }, [])

    const addGas = async (place: string) => {
        const newGas = {
            id : new Date().getTime(),
            place: place,
            whatever: "Es una calle xd",
        }
        const updatedGas = [...gass,newGas];
        setGas(updatedGas)
        console.log(gass);
        store?.set(GAS_KEY,updatedGas);
    }

    const removeGas = async(id: number) =>{
        const toDelete = gass.filter(gas => gas.id !== id);
        setGas(toDelete);
        return store?.set(GAS_KEY,toDelete);
    }
    return{
    gass,addGas, removeGas
}
}