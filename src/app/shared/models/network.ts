import { DatabaseElement } from "../interfaces/interfaces";
import IP from './ip';

export default interface Network extends DatabaseElement{
    name : String
    description : String

    ips? : IP[]
}