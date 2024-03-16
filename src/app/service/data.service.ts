import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  // inputObj:any={
  //   profilePic:"./assets/images/pic.jpg",
  //   fname:"Hemant",
  //   lname:"Patil",
  //   email:"hemantpatil3477@gmail.com",
  //   age:20,
  //   contact: "1234567890",
  //   state:"Maharashtra",
  //   country:"India",
  //   addressType:"Home",
  //   address : {
  //     address1: 'Shivajinagar',
  //     address2: 'Pune',
  //     companyAddress1: '',
  //     companyAddress2: ''
  //   },
  //   interest :[
  //     "Cricket",
  //     "Hockey"
  //   ]
    
  // };
  
  inputObj:any={};

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
    return this.inputObj;
  }
  saveData(input:any)
  {
    this.inputObj=input;
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
