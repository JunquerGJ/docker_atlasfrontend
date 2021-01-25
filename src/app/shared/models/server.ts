import { DatabaseElement } from "../interfaces/interfaces";
import IP from './ip';
import Asset from './asset';
import ContactToEntity from './contacttoentity'
import Characteristic from './characteristic';
import IDS from './ids';

export default interface Server extends DatabaseElement{
    hostname : String
    
    ip : IP
    assets : Asset[]
    contacts : ContactToEntity[],
    characteristics : Characteristic[]
    idss : IDS[]
}