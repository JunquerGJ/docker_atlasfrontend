import { DatabaseElement } from "../interfaces/interfaces";
import Profile from './profile';

export default interface User extends DatabaseElement {
    name : String,
    hash : String,
    profile : Profile
}