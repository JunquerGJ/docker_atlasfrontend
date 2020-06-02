import { DatabaseElement } from "../interfaces/interfaces";
import IP from './ip';
import Asset from './asset';
import ContactToEntity from './contacttoentity'
import Characteristic from './characteristic';


export default interface Server extends DatabaseElement{
    hostname : String
    
    ip : IP
    assets : Asset[]
    contacts : ContactToEntity[],
    characteristics : Characteristic[]
}