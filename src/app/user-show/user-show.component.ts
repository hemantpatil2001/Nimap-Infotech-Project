import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { DataService } from '../service/data.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { response } from 'express';

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

  fnamePattern:string="^[a-zA-Z]{1,20}$";
  emailPattern:string="^([awa-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$";
  phonePattern: string = "^((\\+91-?)|0)?[0-9]{10}$";
  
  countries = ['Albania','Algeria','Brazil','Bulgaria','Canada','Denmark','India','Russia','Singapore', 'USA']; 
  statesMap: { [key: string]: string[] } = {
    'India': ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry'], 
    
    'USA': ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],

    'Albania': ['Berat', 'Dibër', 'Durrës', 'Elbasan', 'Fier', 'Gjirokastër', 'Korçë', 'Kukës', 'Lezhë', 'Shkodër', 'Tiranë', 'Vlorë'],

    'Algeria': ['Adrar', 'Aïn Defla', 'Aïn Témouchent', 'Algiers', 'Annaba', 'Batna', 'Béchar', 'Béjaïa', 'Biskra', 'Blida', 'Bordj Bou Arréridj', 
        'Bouira', 'Boumerdès', 'Chlef', 'Constantine', 'Djelfa', 'El Bayadh', 'El Oued', 'El Tarf', 'Ghardaïa', 'Guelma', 
        'Illizi', 'Jijel', 'Khenchela', 'Laghouat', 'M Sila', 'Mascara', 'Médéa', 'Mila', 'Mostaganem', 'Naâma', 
        'Oran', 'Ouargla', 'Oum El Bouaghi', 'Relizane', 'Saïda', 'Sétif', 'Sidi Bel Abbès', 'Skikda', 
        'Souk Ahras', 'Tamanghasset', 'Tébessa', 'Tiaret', 'Tindouf', 'Tipaza', 'Tissemsilt', 'Tizi Ouzou', 
        'Tlemcen'],

    'Brazil': [
        'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso',
        'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte',
        'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
        ],
    'Bulgaria': [
          'Blagoevgrad', 'Burgas', 'Dobrich', 'Gabrovo', 'Haskovo', 'Kardzhali', 'Kyustendil', 'Lovech', 'Montana',
          'Pazardzhik', 'Pernik', 'Pleven', 'Plovdiv', 'Razgrad', 'Ruse', 'Shumen', 'Silistra', 'Sliven', 'Smolyan',
          'Sofia', 'Sofia-Grad', 'Stara Zagora', 'Targovishte', 'Varna', 'Veliko Tarnovo', 'Vidin', 'Vratsa', 'Yambol'
        ],

    'Canada': [
       'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories',
        'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'
        ],

    'Denmark': [
          'Capital Region of Denmark', 'Central Denmark Region', 'North Denmark Region', 'Region Zealand', 'Region of Southern Denmark'
        ],
    'Singapore': [
          'Ang Mo Kio', 'Bedok', 'Bishan', 'Boon Lay', 'Bukit Batok', 'Bukit Merah', 'Bukit Panjang', 'Bukit Timah', 'Central Water Catchment',
          'Changi', 'Changi Bay', 'Choa Chu Kang', 'Clementi', 'Downtown Core', 'Geylang', 'Hougang', 'Jurong East', 'Jurong West', 'Kallang',
          'Lim Chu Kang', 'Mandai', 'Marina East', 'Marina South', 'Marine Parade', 'Museum', 'Newton', 'North-Eastern Islands', 'Novena', 'Orchard',
          'Outram', 'Pasir Ris', 'Paya Lebar', 'Pioneer', 'Punggol', 'Queenstown', 'River Valley', 'Rochor', 'Seletar', 'Sembawang', 'Sengkang',
          'Serangoon', 'Simpang', 'Singapore River', 'Southern Islands', 'Straits View', 'Sungei Kadut', 'Tampines', 'Tanglin', 'Tengah', 'Toa Payoh',
          'Tuas', 'Western Islands', 'Western Water Catchment', 'Woodlands', 'Yishun'
        ],
    'Russia': [
          'Republic of Adygea', 'Altai Krai', 'Altai Republic', 'Amur Oblast', 'Arkhangelsk Oblast', 'Astrakhan Oblast',
          'Republic of Bashkortostan', 'Belgorod Oblast', 'Bryansk Oblast', 'Republic of Buryatia', 'Chechen Republic', 'Chelyabinsk Oblast',
          'Chukotka Autonomous Okrug', 'Chuvash Republic', 'Republic of Crimea', 'Dagestan Republic', 'Republic of Ingushetia',
          'Irkutsk Oblast', 'Ivanovo Oblast', 'Jewish Autonomous Oblast', 'Kabardino-Balkar Republic', 'Kaliningrad Oblast',
          'Kalmykia Republic', 'Kaluga Oblast', 'Kamchatka Krai', 'Karachay-Cherkess Republic', 'Republic of Karelia', 'Kemerovo Oblast',
          'Khabarovsk Krai', 'Republic of Khakassia', 'Khanty-Mansi Autonomous Okrug', 'Kirov Oblast', 'Komi Republic', 'Kostroma Oblast',
          'Krasnodar Krai', 'Krasnoyarsk Krai', 'Kurgan Oblast', 'Kursk Oblast', 'Leningrad Oblast', 'Lipetsk Oblast', 'Magadan Oblast',
          'Mari El Republic', 'Republic of Mordovia', 'Moscow', 'Moscow Oblast', 'Murmansk Oblast', 'Nenets Autonomous Okrug',
          'Nizhny Novgorod Oblast', 'North Ossetia–Alania Republic', 'Novgorod Oblast', 'Novosibirsk Oblast', 'Omsk Oblast', 'Orenburg Oblast',
          'Oryol Oblast', 'Penza Oblast', 'Perm Krai', 'Primorsky Krai', 'Pskov Oblast', 'Rostov Oblast', 'Ryazan Oblast',
          'Saint Petersburg', 'Sakha (Yakutia) Republic', 'Sakhalin Oblast', 'Samara Oblast', 'Saratov Oblast', 'Republic of North Macedonia',
          'Sevastopol', 'Smolensk Oblast', 'Stavropol Krai', 'Sverdlovsk Oblast', 'Tambov Oblast', 'Republic of Tatarstan', 'Tomsk Oblast',
          'Tuva Republic', 'Tula Oblast', 'Tver Oblast', 'Tyumen Oblast', 'Udmurt Republic', 'Ulyanovsk Oblast', 'Vladimir Oblast',
          'Volgograd Oblast', 'Vologda Oblast', 'Voronezh Oblast', 'Yamalo-Nenets Autonomous Okrug', 'Yaroslavl Oblast', 'Zabaykalsky Krai'
        ]
      
  };
  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  interestCtrl = new FormControl('');
  filteredinterest: Observable<string[]>;
  allinterest: string[] = ['Drawing', 'Reading', 'Dancing', 'Painting', 'Writting'];
  interests:string[]=[];

  @ViewChild('interestInput') interestInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  inputObj:any={
    profilePic:"./assets/images/pic.jpg",
    fname:"",
    lname:"",
    email:"",
    age:20,
    contact: "",
    state:"",
    country:"",
    addressType:"",
    address : {
      address1: '',
      address2: '',
      companyAddress1: '',
      companyAddress2: ''
    },
    interest :this.interests
    
  };

  ngOnInit(): void {
  
  }
  constructor(private dataservice:DataService,private router: Router) {
    this.inputObj=this.dataservice.getData();

    this.interests = this.inputObj.interest;
    this.filteredinterest = this.interestCtrl.valueChanges.pipe(
      startWith(null),
      map((elementData: string | null) => (elementData ? this._filter(elementData) : this.allinterest.slice())),
    );
  }

  getStates(): string[] {
    return this.statesMap[this.inputObj.country] || [];
  }
  
  updateStates(): void {
    // Reset the state when the country changes
    this.inputObj.state = '';
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
  onselectFile(e:any ,profilePic: NgModel)
  {
    const file = e.target.files[0];
    const img = new Image();
      img.onload = () => {
          if (img.width !== 310 || img.height !== 325) {
              // Set invalid size error
              profilePic.control.setErrors({ 'invalidSize': true });
              // Clear the file input field
              e.target.value = '';
              // Clear the preview image
              //this.url="#";
          } else {
            
            if (file) {
              profilePic.control.setErrors(null);
              const fileReader = new FileReader();
              fileReader.readAsDataURL(file);
              // Set up event listener for when file reading is done
              fileReader.onload = (event:any) => {
                // Once reading is complete, convert the image to base64
                const base64Image = fileReader.result as string;
      
                // Update the profilePic property in inputObj with the base64 encoded image
                this.inputObj.profilePic = base64Image;
                this.url=event.target.result;
              };
      
              
            } else {
              // Handle the case where no file is selected
              console.error('No file selected.');
            }
          }
        };
        img.src = window.URL.createObjectURL(file);
      }


  onSliderChange(event: Event): void {
    this.inputObj.age = (event.target as HTMLInputElement).valueAsNumber;
  }
  
  editData(item:any){
    this.inputObj=item;
    this.interests=item.interest;
   
  }
  
  onHome()
  {
    this.router.navigateByUrl('/home');
  }

  updateForm(userEmail:any,data:any)
  {
    //userEmail = 'hemant@gmail.com'; // Replace with the email you want to search
    this.dataservice.getUserIdByEmail(userEmail).subscribe(
      (userId) => {
        if (userId !== null) {
          this.dataservice.updateUser(userId,data).subscribe(response =>{
            alert("Data Updated Successfully!");
            this.inputObj=response;
            //this.inputObj.interest=this.interests;
          })
        } else {
          alert(`User with email ${userEmail} not found`);
        }
      },
      (error) => {
        alert("error");
      }
    );
    
  }
}
