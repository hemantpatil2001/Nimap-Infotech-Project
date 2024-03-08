import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  
  updateDataByEmail(email: string, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/${email}`; // Replace 'yourResource' with your actual resource name
    return this.http.put(`${url}?email=${email}`, updatedData);
  }
}
