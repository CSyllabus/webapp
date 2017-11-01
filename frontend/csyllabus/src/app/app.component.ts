import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';

import { Country } from './country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  countries: Country[] = [];

  constructor(private countriesService: CountriesService) { }

  ngOnInit() {
    this.countriesService.getAllCountries().subscribe(countries => {
         this.countries = countries;
         console.log(this.countries);
    })
  }
}
