import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-show',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './user-show.component.html',
  styleUrl: './user-show.component.css'
})
export class UserShowComponent {


  // listarray=[{"imgurl":"asas",
  // "name":"Hemant",
  // "email":"hemant",
  // age:50,
  // "contact": "123",
  // "address" : "pune",
  // "interest" : "crickeet"}];
  listarray:any[]=[];

  inputObj={
    "imgurl":"",
    "name":"",
    "email":"",
    age:50,
    "contact": "",
    "address" : "",
    "interest" : ""
    
  };

  constructor(private dataservice:DataService,private router: Router) {
    this.listarray=this.dataservice.getData();
  }

  
  url="./assets/images/pic.jpg"
  onselectFile(e:any)
  {
    if(e.target.files)
    {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }
  onSliderChange(event: Event): void {
    // Update the slider value when it changes
    this.inputObj.age = (event.target as HTMLInputElement).valueAsNumber;
  }
  
  editData(item:any){
    this.inputObj=item;
    
  }
  updateDataByEmail(email: string, updatedData: any): void {
    this.dataservice.updateDataByEmail(email, updatedData)
      .subscribe(response => {
        console.log('Data updated successfully', response);
        // Handle the response as needed
      }, error => {
        console.error('Error updating data', error);
        // Handle the error
      });
  }
  onHome()
  {
    this.router.navigateByUrl('/home');
  }
}
