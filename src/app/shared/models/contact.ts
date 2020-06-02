import { DatabaseElement } from "../interfaces/interfaces";


export default interface Contact extends DatabaseElement {
    name : String,
    tlf : String,
    email : String
}