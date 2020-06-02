import { DatabaseElement } from "../interfaces/interfaces";


export default interface CWE extends DatabaseElement {
    cweID : String
    name : String,
    description : String
}