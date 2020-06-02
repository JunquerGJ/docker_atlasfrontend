import { DatabaseElement } from "../interfaces/interfaces";
import  Asset  from "./asset";
import  Domain from "./domain";
import Vulnerability from './vulnerability';
import User from './user';


export default interface Audit extends DatabaseElement{
    name: String,
    auditDate : Date,
    finished :boolean
    methodology : String 
    tool : String
    scope : String
    
    vulnerabilities?: Array<Vulnerability>,
    domain? : Domain 
    auditor? : User
    asset: Asset,
}