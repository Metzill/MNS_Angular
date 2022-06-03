import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  urlBase = "https://reseau.jdedev.fr/api/article/"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.userService.getToken()
    })
  };

  constructor(private http: HttpClient, private userService: UserService) {
    
  }

  getArticleList() {
    return this.http.get<any>(this.urlBase, this.httpOptions)
  }

  postArticle(titre: string, contenu: string){
    return this.http.post<any>(this.urlBase,{"titre":titre,"contenu":contenu}, this.httpOptions)    
  }

  putArticle(id_article:number, titre: string, contenu: string){
    return this.http.put<any>(this.urlBase + '/' + id_article,{"titre":titre,"contenu":contenu}, this.httpOptions)
  }

  deleteArticle(id_article:number){
    return this.http.delete<any>(this.urlBase + '/' + id_article, this.httpOptions)
  }

  getCommentsByArticle(id_article: number){
    return this.http.get<any>(this.urlBase + id_article + '/comment', this.httpOptions)
  }

  getComments() {
    let urlComment = "https://reseau.jdedev.fr/api/comment";
    return this.http.get<any>(urlComment, this.httpOptions)
  }

  postComment(idArt: number, contenu: string) {
    let urlComment = "https://reseau.jdedev.fr/api/comment";
    return this.http.post<any>(urlComment, {"idArt":idArt,"contenu":contenu}, this.httpOptions)
  }

  putComment(id_comment: number, contenu: string){
    let urlComment = "https://reseau.jdedev.fr/api/comment"
    return this.http.put<any>(urlComment + '/' + id_comment, {"contenu":contenu}, this.httpOptions)
  }

  deleteComment(id_comment: number){
    let urlComment = "https://reseau.jdedev.fr/api/comment"
    return this.http.delete<any>(urlComment + '/' + id_comment, this.httpOptions)
  }

}
