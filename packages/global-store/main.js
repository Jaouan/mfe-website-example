import { getMemoryState } from "./global-store";

getMemoryState().increasePopulation();
const bears = getMemoryState().bears;

document.querySelector('#app').innerHTML = `Bears : ${bears}`;
