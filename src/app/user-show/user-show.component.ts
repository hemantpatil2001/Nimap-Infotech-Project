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
    profilePic:"",
    name:"",
    email:"",
    age:50,
    contact: "",
    address : "",
    interest : ""
    
  };

  constructor(private dataservice:DataService,private router: Router) {
    this.listarray=this.dataservice.getData();
  }

  
  url="./assets/images/pic.jpg"
  onselectFile(e:any)
  {
    const file = e.target.files[0];
  
  if (file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // Set up event listener for when file reading is done
    fileReader.onload = (event:any) => {
      // Once reading is complete, convert the image to base64
      const base64Image = fileReader.result as string;

      // Update the profilePic property in inputObj with the base64 encoded image
      this.inputObj.profilePic = base64Image;
      this.url=event.target.result;

      // Now, you can subscribe to the addItem service
     // this.subscribeToAddItem();
    };

    // Start reading the file as a data URL
    fileReader.readAsDataURL(file);
  } else {
    // Handle the case where no file is selected
    console.error('No file selected.');
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
