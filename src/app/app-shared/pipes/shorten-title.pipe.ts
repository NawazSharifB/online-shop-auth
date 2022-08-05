import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle'
})
export class ShortenTitlePipe implements PipeTransform {

  transform(value: string, limit = 20): string {
    value = value.split(' ')
                    .map( word => {
                      return word.charAt(0).toUpperCase() + word.split('').slice(1, word.length).join('');
                    }).join(' ');
    if (value.length > limit) {
      value = value.substr(0, limit) + '...';
    }
    return value;
  }

}
