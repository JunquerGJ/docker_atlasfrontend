import { ClrDatagridSortOrder } from "@clr/angular";
import { Observable } from 'rxjs';

interface DatagridComponent {
    descSort : ClrDatagridSortOrder.DESC
}

interface ElementService<T>{
    delete(element : T ) : Observable<T>

    getSome(filters : Object[],includes : Object) : Observable<T[]>

    add(element : T) : Observable<T>

    modify(element : T) : Observable<T>

    get(id,params) : Observable<T>
}

interface DatabaseElement{
    id : number
}

export  {
    ElementService,
    DatabaseElement
};