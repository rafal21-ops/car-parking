import { Observable } from 'rxjs';


export abstract class IGenericRepository<T> {
  
  abstract get(id: string | number): Observable<T>
  
  
}