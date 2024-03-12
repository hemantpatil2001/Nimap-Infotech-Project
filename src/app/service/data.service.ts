import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  listarray:any[]=[];
  // listarray=[{"imgurl":"",
  // "name":"Hemant",
  // "email":"hemant@gmail.com",
  // age:50,
  // "contact": "123",
  // "address" : "pune",
  // "interest" : "crickeet"}];

  // headers=new HttpHeaders().set('Content-Type','application/json').set('Accept', 'application/json');
  // httpOptions={
  //   headers:this.headers
  // }

  private apiUrl = 'http://localhost:3000/userDetails';

  constructor(private http: HttpClient) {}

  addItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData);
  }
  getData()
  {
    return this.listarray;
  }
  saveData(input:any)
  {
    this.listarray.push(input);
  }
  
  updateUser(id:any,data:any): Observable<any>
  {
    return this.http.put<any>(`http://localhost:3000/userDetails/${id}`, data);
  }
  getUserIdByEmail(email: string): Observable<number | null> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.email === email);
        return user ? user.id : null;
      })
    );
  }
}
