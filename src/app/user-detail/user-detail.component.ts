import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private id!: string | null
  userDetails: {id: number, email: string, avatar: string, pseudo: string}
  userArticle: [{id_article: number, titre: string, contenu: string, id: number}]
  userComment: [{id_commentaire: number, contenu: string, id: number, id_article: number}]
  modifUser: FormGroup

  constructor(formBuilder: FormBuilder,private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.userDetails = {id: -1, email: '', avatar: '', pseudo: ''}
    this.getUserDetailsFromAPI()
    this.userArticle = [{id_article: -1, titre: '', contenu: '', id: -1}]
    this.getUserArticleFromApi()
    this.userComment = [{id_commentaire: -1, contenu: '', id: -1, id_article: -1}]
    this.getUserCommentFromApi()
    this.modifUser = formBuilder.group({
      nEmail: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      nPseudo: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      nPass: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        this.validatorRe(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
      ]),
      nAvatar: new FormControl("", [
        Validators.required
        
      ])
    })
    console.log("userDate.id: ",this.userService.getUserData().id);
    console.log("urlId: ", this.getUrlId());
   }

  ngOnInit(): void {
  }

  validatorRe(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? null : { forbiddenName: { value: control.value } };
    };
  }

  getUrlId(): string | null {
    return this.id
  }

  getCurrUserId() {
    return this.userService.getUserData().id
  }

  getUserDetails(): {id: number, email: string, avatar: string, pseudo: string} {
    return this.userDetails
  }
 
  getUserDetailsFromAPI() {
    if(this.getUrlId()) {
      let idUserUnknown = this.getUrlId() as unknown
      let idUser = idUserUnknown as number
      this.userService.getUser(idUser)
      .subscribe({
        next: response => {
          this.userDetails = response
        },
        error: error => {
          console.error("There was an error = ",error.message)
        }
      })
    }
  }

  getUserArticle(): [{id_article: number, titre: string, contenu: string, id: number}] {
    return this.userArticle
  }
  
  getUserArticleFromApi(){
    if(this.getUrlId()) {
      let idUserUnknown = this.getUrlId() as unknown
      let idUser = idUserUnknown as number
      this.userService.getUserArticle(idUser)
      .subscribe({
        next: response => {
          let toProcessUserArticle = response
          toProcessUserArticle.sort((a:any,b:any) => b.id_article - a.id_article)
          this.userArticle = toProcessUserArticle.slice(0,5)
        },
        error: error => {
          console.error("There was an error = ",error.message)
        }
      })
    }
  }

  getUserComment(): [{id_commentaire: number, contenu: string, id: number, id_article: number}] {
    return this.userComment
  }
  
  getUserCommentFromApi(){
    if(this.getUrlId()) {
      let idUserUnknown = this.getUrlId() as unknown
      let idUser = idUserUnknown as number
      this.userService.getUserComment(idUser)
      .subscribe({
        next: response => {
          let toProcessUserComment = response
          toProcessUserComment.sort((a:any,b:any) => b.id_commentaire - a.id_commentaire);
          this.userComment =  toProcessUserComment.slice(0,5)
        },
        error: error => {
          console.error("There was an error = ",error.message)
        }
      })
    }
  }

  updateUser() {
    if(this.getUrlId()) {
      let idUserUnknown = this.getUrlId() as unknown
      let idUser = idUserUnknown as number
      this.userService.putUser(idUser, this.modifUser.value.nPseudo,this.modifUser.value.nEmail,this.modifUser.value.nPass,this.modifUser.value.nAvatar)
      .subscribe({
        next: response => {
          this.getUserDetailsFromAPI()
        },
        error: error => {
          console.error("There was an error = ",error.message)
        }
      })
    }
  }

  deleteUser(){
    this.getUserArticleFromApi()
    this.getUserComment()
    if(typeof this.userArticle[0] === undefined  && typeof this.userComment[0] === undefined) {
      let idUserUnknown = this.getUrlId() as unknown
      let idUser = idUserUnknown as number
      this.userService.deleteUser(idUser)
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/usersList')
        },
        error: error => {
          console.error("There was an error = ",error.message)
        }
      })
    }else if(this.userArticle[0].id != -1 || this.userComment[0].id != -1){
      alert('Veuillez supprimer tous vos article et tous vos commentaire avant de supprimer votre profil')
    }else {
      let idUserUnknown = this.getUrlId() as unknown
      let idUser = idUserUnknown as number
      this.userService.deleteUser(idUser)
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/usersList')
        },
        error: error => {
          console.error("There was an error = ",error.message)
        }
      })
    }
  }

}
