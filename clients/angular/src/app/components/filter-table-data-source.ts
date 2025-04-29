import { MatTableDataSource } from '@angular/material/table';

export class FilterTableDataSource<T> extends MatTableDataSource<T> {
  filterValues: Partial<Record<keyof T, string>> = {};

  constructor(initialData: T[] = []) {
    super(initialData);
    this.filterPredicate = this.createFilterPredicate();
  }

  private createFilterPredicate() {
    return (data: T, filter: string) => {
      const searchTerms = JSON.parse(filter || '{}') as Partial<Record<keyof T, string>>;
      return (Object.keys(searchTerms) as Array<keyof T>)
        .every(column => {
          const search = searchTerms[column];
          if (!search) return true;
          const value = data[column];
          return value != null
            && value.toString().toLowerCase().includes(search.toLowerCase());
        });
    };
  }

  setFilterValue<K extends keyof T>(column: K, value: string) {
    this.filterValues[column] = value;
    this.filter = JSON.stringify(this.filterValues);
  }
}
