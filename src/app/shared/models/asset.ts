import { DatabaseElement } from "../interfaces/interfaces";
import  Area  from "./area";
import Server from './server';
import Domain from './domain';
import ContactToEntity from './contacttoentity';
import Characteristic from './characteristic';

export default interface Asset extends DatabaseElement {
    name : String,
    alias? : String,
    confidentiality? : String
    authorization? : String
    integrity? : String
    availability? : String
    trazability? : String
    accessLogs? : String
    activityLogs? : String
    status? : String
    statusDate? : Date
    repository? : String
    risk : number
    documentation? : String
    description? : String,
    assetType : String,
    
    
    area? : Area,
    characteristics? : Characteristic[]
    Domain? : Domain[],
    contacts? : ContactToEntity[]
    servers? : Server[]

}