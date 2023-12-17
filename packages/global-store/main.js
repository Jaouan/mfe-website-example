import { getState } from "./global-store";

getState().increasePopulation();
const bears = getState().bears;

document.querySelector('#app').innerHTML = `Bears : ${bears}`;
