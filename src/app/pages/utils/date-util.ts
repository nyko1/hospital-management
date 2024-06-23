import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateUtil {
    static formatDate(dateString: string): string {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois sont indexés à partir de 0
      const day = date.getDate().toString().padStart(2, '0');
  
      return `${year}-${month}-${day}`;
    }
  }
  


  export function dateNotInPastOrTodayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = new Date();
      const controlDate = new Date(control.value);
  
      // Remettre à zéro l'heure pour comparer uniquement les dates
      currentDate.setHours(0, 0, 0, 0);
      controlDate.setHours(0, 0, 0, 0);
  
      if (control.value && (controlDate <= currentDate)) {
        return { dateInvalid: true };
      }
      return null;
    };
  }
  