import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Image } from './image';

@Injectable({ providedIn: 'root' })
export class ImageService {

  private webUrl = 'http://localhost:3000/items';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
  }

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.webUrl).pipe();
  }

  addHero(name: Image): Observable<Image> {
    console.log(name);
    return this.http.post<Image>(this.webUrl, name, this.httpOptions).pipe();
  }
}
