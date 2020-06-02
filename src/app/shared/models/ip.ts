import { DatabaseElement } from "../interfaces/interfaces";
import Network from './network';

export default interface IP extends DatabaseElement{
    ip : String
    network : Network
}