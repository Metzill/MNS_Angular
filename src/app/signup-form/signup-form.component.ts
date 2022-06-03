import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup
  constructor(formBuilder: FormBuilder, private userService: UserService) {
    this.signupForm = formBuilder.group({
      mail: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      pseudo: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      pass: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        this.validatorRe(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
      ]),
      //ToDo = check si conforme au premier mdp
      passConfirm: new FormControl("", [
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
    if (this.signupForm.valid) {
      if (this.signupForm.value.pass === this.signupForm.value.passConfirm) {
        this.userService.postSignup(this.signupForm.value.pseudo,this.signupForm.value.mail,this.signupForm.value.passConfirm)
        alert('Le formulaire est ok')
      }
      else{
        alert('Les deux mots de passe doivent être identiques')
      }
    }
    else {
      alert('il y a une erreur dans le formulaire')
    }
  }

}
