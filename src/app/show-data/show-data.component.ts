import { Component, Input } from '@angular/core';
import { DataService } from '../service/data.service';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-data',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './show-data.component.html',
  styleUrl: './show-data.component.css'
})
export class ShowDataComponent {
  data:any []=[];
  
  constructor(private dataService: DataService,private route: ActivatedRoute) {
    this.dataService.getItems().subscribe((res:any)=>{
      this.data=res;
    });
  }

  ngOnInit(): void {
    
  }  
  
}
