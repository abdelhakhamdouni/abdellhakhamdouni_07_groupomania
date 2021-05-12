import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
import 'moment/locale/fr'
moment.locale('fr')

@Pipe({
  name: 'mdate'
})
export class MdatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return moment(value).fromNow();
  }

}
