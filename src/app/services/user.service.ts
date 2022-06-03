import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlBase = "https://reseau.jdedev.fr/api/user"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private userData: {token: string, id:string, email:string} 
  
  constructor(private http: HttpClient) {
    this.userData = {token:'', id:'', email:''}
    
  }
  getUserData(): {token: string, id:string, email:string} {
    return this.userData
  }
  setUserData(data: {token: string, id:string, email:string}){
    this.userData = this.userData
  }
  getToken(): string {
    return this.userData.token
  }
  setToken(token: string){
    this.userData.token = token
  }


  postConnection(email: string, pass: string){
      this.http.post<any>(this.urlBase + "/connect",{"email":email,"password":pass}, this.httpOptions)
      .subscribe({
        next: response => {
          this.userData = response
          return 'user logged'
        },
        error: error => {
          console.error("There was an error = ",error.message);
        }
      })
  }

  postSignup(pseudo: string, email: string, pass: string){
    this.http.post<any>(this.urlBase,{"pseudo":pseudo,"email":email,"password":pass,"avatar":""}, this.httpOptions)
    .subscribe({
      next: response => {
        console.log("inscription bien réalisée")
        return 'user signupped'
      },
      error: error => {
        console.error("There was an error = ",error.message);
      }
    })
  }

  getUser(id_user: number){
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.userData.token
      })
    };
    return this.http.get<any>(this.urlBase + '/' + id_user, httpOptions2)
  }

  getUsersList(){
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.userData.token
      })
    };
    return this.http.get<any>(this.urlBase, httpOptions2)
  }

  getUserArticle(id_user: number){
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.userData.token
      })
    };
    return this.http.get<any>(this.urlBase + '/' + id_user + '/article', httpOptions2)
  }

  getUserComment(id_user: number){
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.userData.token
      })
    };
    return this.http.get<any>(this.urlBase + '/' + id_user + '/comment', httpOptions2)
  }

  putUser(id_user: number, pseudo: string, email: string, password: string, avatar: string){
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.userData.token
      })
    };
    return this.http.put<any>(this.urlBase + '/' + id_user,{"pseudo":pseudo,"email": email,"password": password,"avatar": avatar}, httpOptions2)
  }

  deleteUser(id_user: number){
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.userData.token
      })
    };
    return this.http.delete<any>(this.urlBase + '/' + id_user, httpOptions2)
  }
}
