import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataService } from '../service/data.service';
import { HttpClientModule } from '@angular/common/http';
import { FootComponent } from "../foot/foot.component";
import { CommonModule } from '@angular/common';
import { ShowDataComponent } from '../show-data/show-data.component';

@Component({
    selector: 'app-landing',
    standalone: true,
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css',
    imports: [RouterOutlet, FormsModule, HttpClientModule, FootComponent,RouterLink,CommonModule,ShowDataComponent]
})
export class LandingComponent {
  // userName ='';
  // email='';
  // contact='';
  // address='';
  // imgurl='';
  // interest='';

  adminEmail='';
  password='';


  inputObj={
    profilePic:"",
    name:"",
    email:"",
    age:20,
    contact: "",
    address : "",
    interest : ""
    
  };
  constructor(private dataService: DataService,private router: Router) {
    
  }
  
  

  submitForm(): void {
    
    //const newItem = {imgurl:this.imgurl,name: this.userName,email:this.email,age:this.sliderValue,contact:this.contact,address:this.address,interest:this.interest};
    this.dataService.saveData(this.inputObj);
    //this.router.navigateByUrl('/userShow');
    this.dataService.addItem(this.inputObj).subscribe(response => {
      this.router.navigateByUrl('/userShow');
      // Reset form or perform other actions as needed
    });
  }
  

  onSliderChange(event: Event): void {
    // Update the slider value when it changes
    this.inputObj.age = (event.target as HTMLInputElement).valueAsNumber;
  }
  onLogin() {
    if(this.adminEmail == "admin" && this.password == "admin") {
      this.router.navigateByUrl('/show')

    } else {
      alert('Wrong Credentials')
    }
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


  
  
}
