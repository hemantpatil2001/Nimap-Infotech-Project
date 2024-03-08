import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";
import { ShowDataComponent } from "./show-data/show-data.component";
import { ContactComponent } from "./contact/contact.component";
import { FootComponent } from "./foot/foot.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LandingComponent, ShowDataComponent, ContactComponent, FootComponent]
})
export class AppComponent {
  title = 'my-project';
}
