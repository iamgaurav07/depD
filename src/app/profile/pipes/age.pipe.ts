import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value)
    var timeDiff = Math.abs(Date.now() - new Date(value).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }

}
