import {ElectroenergyRepository} from "./electroenergy/electroenergy.repository";

const electroenergy = new ElectroenergyRepository();

export const store = {
  electroenergy
};

//@ts-ignore
window.store = store;
