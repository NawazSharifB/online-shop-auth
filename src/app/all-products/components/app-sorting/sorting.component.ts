import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/services/data.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  sortBy = 'None';
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  sortProducts(by: string): void {
    this.sortBy = by;
    this.dataService.sortBy(by);
  }

}
