import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(objs: any[], filter: string, fields: string[] = []): any[] {
    if (!objs || !filter) {
        return objs;
    }
    if(!fields.length) return objs.filter(obj => Object.values(obj).join(' ').toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    else return objs.filter(obj => {
      let str = '';
      for (const field of fields) {
        str += obj[field] + ' ';
      }
      return str.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    });
  }
}
