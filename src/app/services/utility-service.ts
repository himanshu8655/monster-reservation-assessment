import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogData } from '../models/dialog-data';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  resetForm(formGroup: FormGroup) {
    formGroup.reset();
    Object.keys(formGroup.controls).forEach((key) => {
      formGroup.get(key)?.setErrors(null);
    });
  }

  markFormTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      formGroup.get(key)?.markAsTouched();
    });
  }

  getdialogDataObject(title: string, subTitle: string): DialogData {
    let data: DialogData = {
      title: title,
      subTitle: subTitle,
    };
    return data;
  }
}
