import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ChildComponent } from "./components/child/child.component";
import { HeaderComponent } from './components/header/header.component';
import { FilterByDietPipe } from './filter-by-diet.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FormsModule, FilterByDietPipe, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mi proyecto';
  userName: string ='Xavi';
  number: number = 0;
  count: number = 0;
  condition: boolean = false;
  condition2: boolean = false;

  movies: string[] = ['Lord of the Rings', 'Star Wars', 'Harry Potter'];

  animals: any = [
    // Mamíferos (al menos 2)
    { id: 1, name: 'León', type: 'Mamífero', diet: 'Carnívoro' },
    { id: 2, name: 'Tigre', type: 'Mamífero', diet: 'Carnívoro' },
    { id: 3, name: 'Canguro', type: 'Mamífero', diet: 'Herbívoro' },
    { id: 4, name: 'Elefante', type: 'Mamífero', diet: 'Herbívoro' },

    // Aves
    { id: 5, name: 'Pingüino', type: 'Ave', diet: 'Carnívoro' }, // Corregí la tilde
    { id: 6, name: 'Gallina', type: 'Ave', diet: 'Omnívoro' },   // Las gallinas comen granos e insectos, no solo son herbívoras
    { id: 7, name: 'Águila', type: 'Ave', diet: 'Carnívoro' },

    // Reptiles
    { id: 8, name: 'Serpiente', type: 'Reptil', diet: 'Carnívoro' },
    { id: 9, name: 'Tortuga', type: 'Reptil', diet: 'Herbívoro' }, // Algunas tortugas son herbívoras, otras omnívoras

    // Anfibios
    { id: 10, name: 'Rana', type: 'Anfibio', diet: 'Carnívoro' },
    { id: 11, name: 'Salamandra', type: 'Anfibio', diet: 'Carnívoro' },

    // Peces
    { id: 12, name: 'Tiburón', type: 'Pez', diet: 'Carnívoro' },
    { id: 13, name: 'Pez payaso', type: 'Pez', diet: 'Omnívoro' }
  ];

  textPadre: string = 'Variable desde el padre';

  person: any = {
    name: 'Juan',
    age: 30,
    address: {
      street: 'Calle 123',
      city: 'Madrid'
    },
    country: 'España'
  };


  addOne(){
    this.number++;
  }
}
