import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage';

const GAS_KEY = 'my-gas'

export interface GasItem {
IDEESS: string,
IDMunicipio: string,
IDProducto: string | null

}
export function useStorage(update:boolean){
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
    }, [update])

    const addGas = async (estacion: string, idmunicipio: string,idproducto : string | null) => {
        const newGas = {
            IDEESS : estacion,
            IDMunicipio : idmunicipio,
            IDProducto : idproducto
        }
        const updatedGas = [...gass,newGas];
        setGas(updatedGas)
        store?.set(GAS_KEY,updatedGas);
        console.log('Stored ',gass);
    }

    const removeGas = async(id: string) =>{
        const toKeep = gass.filter(gas => gas.IDEESS !== id);
        setGas(toKeep);
        console.log('To Keep ',toKeep);
        return store?.set(GAS_KEY,toKeep);
    }
    return{
    gass,addGas, removeGas
}
}