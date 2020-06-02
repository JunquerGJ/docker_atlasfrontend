import { DatabaseElement } from "../interfaces/interfaces";
import Asset from './asset';
import Certificate from './certificate';

export default interface Domain extends DatabaseElement{
    url : String
    enviroment : String
    waf : Boolean
    privateDomain : Boolean

    certificate? : Certificate
    asset? : Asset
}