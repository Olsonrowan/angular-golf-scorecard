import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
// import { Courses } from '../interfaces/courses'


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<any> {
    return this.http.get<any>('https://golf-courses-api.herokuapp.com/courses');
  }

  getCourseById(id: string){
    return this.http.get(`https://golf-courses-api.herokuapp.com/courses/${id}`).pipe(map(data => data['data']));
  }

}

