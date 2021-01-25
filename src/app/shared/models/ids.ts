import { DatabaseElement } from "../interfaces/interfaces";
import Server from './server';

export default interface IDS extends DatabaseElement{
    name : String
    description : String
    denyList : Boolean
    servers : Server[]
}