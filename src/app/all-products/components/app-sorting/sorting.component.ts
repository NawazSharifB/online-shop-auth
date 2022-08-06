import { Component, OnInit } from '@angular/core';
import { SORT_OPTIONS } from '../../../shared/constants/sort-options';
import { SortByOptions } from '../../../shared/enums/sort-by-options';
import { DropdownOptions } from '../../../shared/interfaces/dropdown-options';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  availableSortingOptions = SORT_OPTIONS;
  sortBy: DropdownOptions<SortByOptions> = this.dataService.sortBy$.value;

  constructor(private dataService: DataService) {}

  sortProducts(sortChoice: DropdownOptions<SortByOptions>): void {
    this.sortBy = sortChoice;
    this.dataService.sortBy(sortChoice);
  }

}
