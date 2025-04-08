import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDiet',
  standalone: true // Si usas Angular 17+ y módulos standalone
})
export class FilterByDietPipe implements PipeTransform {
  transform(animals: any[], diet: string): any[] {
    return animals.filter(animal => animal.diet === diet);
  }
}
