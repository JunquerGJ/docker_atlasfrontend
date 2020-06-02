import { DatabaseElement } from "../interfaces/interfaces";

export default interface Certificate extends DatabaseElement{
    domainName : String
    wildcard : boolean
    issuer : String
    expirationDate : Date
}