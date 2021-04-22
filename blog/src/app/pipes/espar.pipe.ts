// Import objects of pipes
import {Pipe, PipeTransform} from '@angular/core';

// Define Pipe with @
@Pipe({
    name: 'espar'
})

// Export the pipe class
export class EsParPipe implements PipeTransform{
    // This is necesari
    transform(value: any){
        // Here logic to the pipe
        var espar = "no es par";
        if(value % 2 == 0){
            espar = "es un numero par";
        }

        return "El año es: "+value+" y "+espar;
    }
}