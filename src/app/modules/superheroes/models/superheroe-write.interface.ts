import { SuperheroeName } from "./superheroe-name.interface";

export interface SuperHeroeWrite{
    name:SuperheroeName,
    team:string,
    superpowers:string[],
    avatar:string
}