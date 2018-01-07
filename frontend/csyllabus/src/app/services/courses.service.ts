
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

import {Course} from '../classes/course';
import { Comment } from '../classes/comment';


@Injectable()
export class CoursesService {

  coursesUrl = environment.apiUrl + 'courses/';
  coursesByProgramUrl = environment.apiUrl + 'programs/';
  coursesByFacultiesUrl = environment.apiUrl + 'faculties/';
  coursesByUniversitiesUrl = environment.apiUrl + 'universities/';
  commentsUrl = environment.apiUrl + 'comments/';
  explorerUrl = environment.apiUrl + 'explorer';
  comparatorUrl = environment.apiUrl + 'comparator';

  constructor(private http: Http) {
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get(this.coursesUrl)
      .map(res => res.json().data.items as Course[]).catch(this.handleError);
  }

  getCourseById(id): Observable<Course> {
    return this.http.get(this.coursesUrl + id)
      .map(res => res.json().data.items[0] as Course).catch(this.handleError);
  }

  getCoursesByFaculty(facultyId, offset): Observable<Course[]> {
    return this.http
      .get(this.coursesByFacultiesUrl + facultyId + '/courses/' + '?limit=-1&offset=' + offset)
      .map(res => res.json().data.items as Course[]).catch(this.handleError);
  }

  getCoursesByUniversity(universityId, offset): Observable<Course[]> {
    return this.http
      .get(this.coursesByUniversitiesUrl + universityId + '/courses/' + '?limit=-1&offset=' + offset)
      .map(res => res.json().data.items as Course[]).catch(this.handleError);
  }

  exploreByFaculty(keywords, facultyId): Observable<any[]> {
    return this.http.get(this.explorerUrl + '?keywords=' + keywords + '&faculty_id=' + facultyId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  exploreByUniversity(keywords, universityId): Observable<any[]> {
    return this.http.get(this.explorerUrl + '?keywords=' + keywords + '&university_id=' + universityId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  exploreByCity(keywords, cityId): Observable<any[]> {
    return this.http.get(this.explorerUrl + '?keywords=' + keywords + '&city_id=' + cityId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  exploreByCountry(keywords, countryId): Observable<any[]> {
    return this.http.get(this.explorerUrl + '?keywords=' + keywords + '&country_id=' + countryId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  getCoursesByProgram(programId): Observable<Course[]> {
    return this.http.get(this.coursesByProgramUrl + programId + '/courses/')
      .map(res => res.json().data.items as Course[]).catch(this.handleError);
  }


  compareByFaculty(courseId, facultyId): Observable<any[]> {
    return this.http.get(this.comparatorUrl + '?course=' + courseId + '&faculty_id=' + facultyId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  compareByUniversity(courseId, universityId): Observable<any[]> {
    return this.http.get(this.comparatorUrl + '?course=' + courseId + '&university_id=' + universityId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  compareByCity(courseId, cityId): Observable<any[]> {
    return this.http.get(this.comparatorUrl + '?course=' + courseId + '&city_id=' + cityId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  compareByCountry(courseId, countryId): Observable<any[]> {
    return this.http.get(this.comparatorUrl + '?course=' + courseId + '&country_id=' + countryId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  getAllCommentsByCourse(courseId):Observable<Comment[]>{
    console.log('aaaaaaaaaa');
    return this.http.get(this.coursesUrl + courseId + '/comments/')
    .map(res => res.json().data.items as Comment[]).catch(this.handleError);
  }
  /*insertAnewComment(courseId, newUserName, newComment) {
    return this.http.post(this.coursesUrl + courseId + '/comments/',{
      author: newUserName,
      content: newComment,
      show: 1
    })
  }*/


  insertAnewComment(courseId, data): Observable<any> {

    return this.http.post(this.coursesUrl + courseId + '/comments/', data)
      .map(res => res.json()).catch(this.handleError);

  }

  deleteComment(commentId): Observable<any> {

    return this.http.delete(this.commentsUrl + commentId)
      .map(res => res.json()).catch(this.handleError);

  }



  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}


