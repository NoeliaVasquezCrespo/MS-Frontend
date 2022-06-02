import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../service/countryservice';
import { NodeService } from '../../service/nodeservice';
import { SelectItem } from 'primeng/api';

@Component({
  
  templateUrl: './book-forms.component.html',
  styleUrls: ['./book-forms.component.scss']
})
export class BookFormsComponent implements OnInit {

  countries: any[];

  filteredCountries: any[];

  selectedCountryAdvanced: any[];

  valSlider = 50;

  valColor = '#424242';

  valRadio: string;

  valCheck: string[] = [];

  valSwitch: boolean;

  cities: SelectItem[];

  selectedList: SelectItem;

  selectedDrop: SelectItem;

  selectedMulti: string[] = [];

  treeSelectNodes: any[];

  selectedNode: SelectItem;

  valToggle = false;

  paymentOptions: any[];

  valSelect1: string;

  valSelect2: string;

  valueKnob = 20;

  selectedDate:any;

  constructor(private countryService: CountryService, private nodeService: NodeService) {}

  ngOnInit() {
      this.countryService.getCountries().then(countries => {
          this.countries = countries;
      });

      this.cities = [
          {label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}},
          {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
          {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
          {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}},
          {label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}}
      ];

      this.paymentOptions = [
          {name: 'Option 1', value: 1},
          {name: 'Option 2', value: 2},
          {name: 'Option 3', value: 3}
      ];

      this.nodeService.getFiles().then(files => this.treeSelectNodes = files)
  }

  filterCountry(event) {
      const filtered: any[] = [];
      const query = event.query;
      for (let i = 0; i < this.countries.length; i++) {
          const country = this.countries[i];
          if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(country);
          }
      }

      this.filteredCountries = filtered;
  }

  selectedState:any;
    
    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];
}
