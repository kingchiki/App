import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AuthResponse} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) {
  }

  BASE_URL: string = environment.apiUrl

  getToken() {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem("userData")!);
      console.log(userData.access_token);
      return userData.access_token;
    }
    return null
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(`${this.BASE_URL}/recipe/all`)
  }

  /* getRecipesByUser(): Observable<Recipe[]> {
     const httpOptions = {
       headers: new HttpHeaders({
         // 'Content-Type':  'application/json',
         "Authorization": `Bearer ${this.getToken()}`
       }),
     };

     console.log(this.getToken())

     return this.httpClient.get<Recipe[]>(`${this.BASE_URL}/recipe/by-user`, httpOptions);
   }*/

  getRecipesByUser(): Observable<any> {
    console.log('getRecipesByUser');
    const accessToken = this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${accessToken}`
      })
    };

    const url = `${this.BASE_URL}/recipe/by-user`;
    return this.httpClient.get<any>(url, httpOptions);

  }

  searchRecipe(query:string): Observable<any> {

    const url = `${this.BASE_URL}/recipe/search?${query}`;
    return this.httpClient.get<any>(url);

  }

  sendRecipe(formData: FormData) {
    const accessToken = this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Authorization': `Bearer ${accessToken}`
      })
    };

    const url = `${this.BASE_URL}/recipe/write`;

    console.log({url, formData})
    return this.httpClient.post<any>(url, formData, httpOptions);
  }

  getRecipeDetails(id: string | null, isOnline: string | null) {
    const url = `${this.BASE_URL}/recipe/single/${id}?isOnline=${isOnline}`;
    return this.httpClient.get<any>(url);
  }
}


export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  description: string;
  readyInMinutes: number;
  image: ImageInfo;
  isOnline: boolean;
  user: User
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: string;
}

export interface ImageInfo {
  id: number;
  filename: string;
  mimeType: string;
  data: string;
}
