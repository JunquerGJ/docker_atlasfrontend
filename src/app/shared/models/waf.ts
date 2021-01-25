import { DatabaseElement } from "../interfaces/interfaces";
import Domain from './domain';

export default interface WAF extends DatabaseElement{
    name : String
    description : String
    denyList : Boolean
    domains : Domain[]
}