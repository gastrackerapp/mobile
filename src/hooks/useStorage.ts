import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage';

const GAS_KEY = 'my-gas'

export interface GasItem {
IDEESS: string,
IDMunicipio: string,
IDProducto: string | null

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

    const addGas = async (estacion: string, idmunicipio: string,idproducto : string | null) => {
        const newGas = {
            IDEESS : estacion,
            IDMunicipio : idmunicipio,
            IDProducto : idproducto
        }
        const updatedGas = [...gass,newGas];
        setGas(updatedGas)
        console.log(gass);
        store?.set(GAS_KEY,updatedGas);
    }

    const removeGas = async(id: string) =>{
        const toDelete = gass.filter(gas => gas.IDEESS !== id);
        setGas(toDelete);
        return store?.set(GAS_KEY,toDelete);
    }
    return{
    gass,addGas, removeGas
}
}