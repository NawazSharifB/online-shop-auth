import { SortByOptions } from '../enums/sort-by-options';
import { DropdownOptions } from '../interfaces/dropdown-options';

export const SORT_OPTIONS: DropdownOptions<SortByOptions>[] = [
  {key: SortByOptions.None, text: 'None'},
  {key: SortByOptions.HighToLow, text: 'High to Low'},
  {key: SortByOptions.LowToHigh, text: 'Low to High'},
];
