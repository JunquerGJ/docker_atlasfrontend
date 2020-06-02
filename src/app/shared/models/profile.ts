import { DatabaseElement } from "../interfaces/interfaces";
import  Permission  from "./permission";


export default interface Profile extends DatabaseElement{
    name : String
    permissions : Permission[]
}