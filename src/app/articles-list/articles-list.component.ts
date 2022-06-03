import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  usersList: [{id: number, email: string, avatar: string, pseudo: string, niveau: number, password: string}]
  articleList: [{id_article: number, titre: string, contenu: string, id: number, writer: string, comments: [{id_commentaire: number, contenu: string, id: number, id_article: number, auteur: string}]}]
  commentList: [{id_commentaire: number, contenu: string, id: number, id_article: number, auteur: string}]
  ajoutArticle: FormGroup
  modifArticle: FormGroup
  ajoutComment: FormGroup
  modifComment: FormGroup
  id:number
  idArticleToComment: number

  constructor(formBuilder: FormBuilder, private articleService: ArticleService, private userService: UserService) {
    this.idArticleToComment = -1
    this.ajoutArticle = formBuilder.group({
      titre: new FormControl("", [
        Validators.required,
      ]),
      contenu: new FormControl("", [
        Validators.required,
      ])
    })
    this.commentList = [{id_commentaire: -1, contenu: '', id: -1, id_article: -1, auteur: ''}]
    this.usersList = [{id:-1,email:'',avatar:'',pseudo:'',niveau:0,password:''}]
    this.getUsersList()
    this.articleList = [{id_article: -1, titre: '', contenu: '', id: -1, writer: '', comments: [{id_commentaire: -1, contenu: '', id: -1, id_article: -1, auteur: ''}]}]
    this.getArticleList()
    this.id = parseInt(this.userService.getUserData().id)
    this.modifArticle = formBuilder.group({
      mTitre: new FormControl("", [
        Validators.required,
      ]),
      mContenu: new FormControl("", [
        Validators.required,
      ])
    })
    this.ajoutComment = formBuilder.group({
      nComContenu: new FormControl("",[
        Validators.required,
      ])
    })
    this.modifComment = formBuilder.group({
      mComContenu: new FormControl("", [
        Validators.required,
      ])
    })
   }

  ngOnInit(): void {
  }

  getUsersList() {
    this.userService.getUsersList()
    .subscribe({
      next: response => {
        this.usersList = response
      },
      error: error => {
        console.error("There was an error = ",error.message);
      }
    })
  }

  submitForm() {
    if (this.ajoutArticle.valid) {
      this.articleService.postArticle(this.ajoutArticle.value.titre, this.ajoutArticle.value.contenu)
      .subscribe({
      next: response => {
        this.getArticleList()
      },
      error: error => {
        console.error("There was an error = ",error.message);
      }
    })
    }
    else {
      alert('il y a une erreur dans le formulaire')
    }
  }

  deleteArticle(id_article: number){
      this.articleService.deleteArticle(id_article)
      .subscribe({
        next: response => {
          this.getArticleList()
        },
        error: error => {
          console.error("There was an error = ",error.message);
        }
      })
  }

  updateArticle(id_article: number) {
    if (this.modifArticle.valid) {
      this.articleService.putArticle(id_article,this.modifArticle.value.mTitre, this.modifArticle.value.mContenu).subscribe({
        next: response => {
          this.getArticleList()
        },
        error: error => {
          console.error("There was an error = ",error.message);
        }
      })
    }
    else {
      alert('il y a une erreur dans le formulaire')
    }
  }

  getArticleList() {
    this.articleList = [{id_article: -1, titre: '', contenu: '', id: -1, writer: '', comments: [{id_commentaire: -1, contenu: '', id: -1, id_article: -1, auteur:''}]}]
    this.articleService.getArticleList()
    .subscribe({
      next: response => {
        this.articleList = response
        this.commentList = [{id_commentaire: -1, contenu: '', id: -1, id_article: -1, auteur: ''}]
        this.articleService.getComments()
        .subscribe({
          next: response => {
            this.commentList = response
            this.commentList.forEach(comment => {
              comment.auteur = ''
              this.usersList.forEach(user => {
                if(user.id === comment.id) comment.auteur = user.pseudo
              })
            })
            this.articleList.forEach(article => {
              article.comments = [{id_commentaire: -1, contenu: '', id: -1, id_article: -1, auteur: ''}]
              this.usersList.forEach(user => {
                if(user.id === article.id) article.writer = user.pseudo
              });
              this.commentList.forEach(comment => {
                if(comment.id_article === article.id_article) article.comments.push(comment)
              });
            });
          },
          error: error => {
            console.error("There was an error = ",error.message);
          }
        });
      },
      error: error => {
        console.error("There was an error = ",error.message);
      }
    })
  }

  setIdArticleToComment(id_article: number){
    this.idArticleToComment = id_article
  }
  
  postCom() {
    if (this.ajoutComment.valid) {
      this.articleService.postComment(this.idArticleToComment,this.ajoutComment.value.nComContenu)
      .subscribe({
      next: response => {
        this.getArticleList()
      },
      error: error => {
        console.error("There was an error = ",error.message);
      }
    })
    }
    else {
      alert('il y a une erreur dans le formulaire')
    }
  }

  updateCom(id_comment: number){
    this.articleService.putComment(id_comment, this.modifComment.value.mComContenu)
    .subscribe({
      next: response => {
        this.getArticleList()
      },
      error: error => {
        console.error("There was an error = ",error.message);
      }
    })
  }

  deleteCom(id_comment: number){
    this.articleService.deleteComment(id_comment)
    .subscribe({
      next: response => {
        this.getArticleList()
      },
      error: error => {
        console.error("There was an error = ",error.message);
      }
    })
  }

}