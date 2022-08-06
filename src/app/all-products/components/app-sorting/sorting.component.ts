import { SortByOptions } from './../../../shared/enums/sort-by-options';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/services/data.service';
import { SORT_OPTIONS } from '../../../shared/constants/sort-options';
import { DropdownOptions } from '../../../shared/interfaces/dropdown-options';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {
  availableSortingOptions = SORT_OPTIONS;
  sortBy: DropdownOptions<SortByOptions> = this.dataService.sortBy$.value;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  sortProducts(sortChoice: DropdownOptions<SortByOptions>): void {
    this.sortBy = sortChoice;
    this.dataService.sortBy(sortChoice);
  }

}
