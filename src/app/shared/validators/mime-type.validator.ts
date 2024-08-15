import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export const mimeType = (
  control: AbstractControl
):
  | Promise<{ [key: string]: any } | null>
  | Observable<{ [key: string]: any } | null> => {
  if (typeof control.value === 'string') {
    return of(null);
  }

  const file = control.value as File;
  if (!file) {
    return of(null);
  }

  const fileReader = new FileReader();
  const fileReader$ = fromEvent(fileReader, 'loadend').pipe(
    map(() => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
        0,
        4
      );
      let header = '';
      let isValid = false;

      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }

      console.log('File header:', header); // Debugging output

      switch (header) {
        case '89504e47': // PNG
          isValid = true;
          break;
        case 'ffd8ffe0': // JPEG
        case 'ffd8ffe1': // JPEG
        case 'ffd8ffe2': // JPEG
        case 'ffd8ffe3': // JPEG
        case 'ffd8ffe8': // JPEG
          isValid = true;
          break;
        case '47494638': // GIF
          isValid = true;
          break;
        case '52494646': // RIFF (e.g., webp)
          isValid = true;
          break;
        default:
          isValid = false;
          break;
      }

      console.log('Is valid:', isValid); // Debugging output

      return isValid ? null : { invalidMimeType: true };
    })
  );

  fileReader.readAsArrayBuffer(file);
  return fileReader$;
};
