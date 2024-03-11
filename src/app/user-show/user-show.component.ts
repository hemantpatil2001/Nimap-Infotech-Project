import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { DataService } from '../service/data.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-user-show',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,MatFormFieldModule,MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe],
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

  fnamePattern:string="^[a-zA-Z]{1,20}$";
  states: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry'
  ];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  interestCtrl = new FormControl('');
  filteredinterest: Observable<string[]>;
  allinterest: string[] = ['Drawing', 'Reading', 'Dancing', 'Painting', 'Writting'];
  interests:string[]=[];

  @ViewChild('interestInput') interestInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  inputObj={
    profilePic:"",
    fname:"",
    lname:"",
    email:"",
    age:20,
    contact: "",
    state:"",
    addressType:"",
    address : {
      address1: '',
      address2: '',
      companyAddress1: '',
      companyAddress2: ''
    },
    interest :this.interests,
    
  };
  

  constructor(private dataservice:DataService,private router: Router) {
    this.listarray=this.dataservice.getData();
    this.filteredinterest = this.interestCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allinterest.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.inputObj.interest.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.interestCtrl.setValue(null);
  }

  remove(interest: string): void {
    const index = this.inputObj.interest.indexOf(interest);

    if (index >= 0) {
      this.inputObj.interest.splice(index, 1);

      this.announcer.announce(`Removed ${interest}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.inputObj.interest.push(event.option.viewValue);
    this.interestInput.nativeElement.value = '';
    this.interestCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.inputObj.interest.filter((interest: string)=> interest.toLowerCase().includes(filterValue));
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
    this.interests=item.interest;
    
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

  updateForm()
  {
    
  }
}
