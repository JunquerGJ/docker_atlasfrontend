import { DatabaseElement } from "../interfaces/interfaces";
import Asset from './asset';
import Certificate from './certificate';
import WAF from './waf';

export default interface Domain extends DatabaseElement{
    url : String
    enviroment : String
    privateDomain : Boolean
    client : String
    errorCode : String
    comments : String

    certificate? : Certificate
    certificateId?: number
    asset? : Asset
    assetId?: number
    wafs : WAF[]
}