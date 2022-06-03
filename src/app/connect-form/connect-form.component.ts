import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connect-form',
  templateUrl: './connect-form.component.html',
  styleUrls: ['./connect-form.component.css']
})
export class ConnectFormComponent implements OnInit {

  connectForm: FormGroup
  constructor(formBuilder: FormBuilder, private userService: UserService) {
    this.connectForm = formBuilder.group({
      pseudo: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      pass: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        this.validatorRe(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
      ])
    })
  }

  ngOnInit(): void {
  }
  validatorRe(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? null : { forbiddenName: { value: control.value } };
    };
  }

  submitForm() {
    if (this.connectForm.valid) {
      this.userService.postConnection(this.connectForm.value.pseudo, this.connectForm.value.pass)
      alert('Le formulaire est ok')
    }
    else {
      alert('il y a une erreur dans le formulaire')
    }
  }
}
