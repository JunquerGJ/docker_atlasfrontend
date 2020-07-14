import { DatabaseElement } from "../interfaces/interfaces";
import Vulnerability from './vulnerability';

export default interface Evidence extends DatabaseElement{
    vulnerability : Vulnerability
    path : String
    description : String
    evidenceType : String
    content : string
}