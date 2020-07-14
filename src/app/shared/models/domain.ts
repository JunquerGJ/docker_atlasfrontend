import { DatabaseElement } from "../interfaces/interfaces";
import Asset from './asset';
import Certificate from './certificate';
import List from './list';

export default interface Domain extends DatabaseElement{
    url : String
    enviroment : String
    privateDomain : Boolean
    client : String
    errorCode : String

    certificate? : Certificate
    asset? : Asset
    lists : List[]
}