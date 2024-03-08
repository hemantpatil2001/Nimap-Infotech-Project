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
    "imgurl":"",
    "name":"",
    "email":"",
    age:50,
    "contact": "",
    "address" : "",
    "interest" : ""
    
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
  //inputObj.age: number = 50; // Initial value for the slider

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
    if(e.target.files)
    {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }

  
  
}
