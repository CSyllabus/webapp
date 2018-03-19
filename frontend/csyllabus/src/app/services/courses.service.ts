import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

import {Course} from '../classes/course';
import {Comment} from '../classes/comment';
import {GoogleAnalyticsEventsService} from "./google-analytics-events.service";
import {EventsService} from "./events.service";


@Injectable()
export class CoursesService {

  coursesUrl = environment.apiUrl + 'courses/';
  coursesByProgramUrl = environment.apiUrl + 'programs/';
  coursesByFacultiesUrl = environment.apiUrl + 'faculties/';
  coursesByUniversitiesUrl = environment.apiUrl + 'universities/';
  commentsUrl = environment.apiUrl + 'comments/';
  explorerUrl = environment.apiUrl + 'explorer';
  comparatorUrl = environment.apiUrl + 'comparator';
  comparatorTextUrl = environment.apiUrl + 'comparator_text_input';

  constructor(private http: Http, public googleAnalyticsEventsService: GoogleAnalyticsEventsService, private eventsService: EventsService) {
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
    this.googleAnalyticsEventsService.emitEvent("explorer", "explore_by_faculty: " + facultyId, keywords, 1);

    let data = {'event_type': 'explore_by_faculty', 'event_data': {'faculty_id': facultyId, "keywords": keywords}};
    this.eventsService.emitEvent(data).subscribe(()=>{});

    return this.http.get(this.explorerUrl + '?keywords=' + keywords + '&faculty_id=' + facultyId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  exploreByUniversity(keywords, universityId): Observable<any[]> {
    this.googleAnalyticsEventsService.emitEvent("explorer", "explore_by_university: " + universityId, keywords, 1);
    let data = {
      'event_type': 'explore_by_university',
      'event_data': {'university_id': universityId, "keywords": keywords}
    };
    this.eventsService.emitEvent(data).subscribe(()=>{});;
    return this.http.get(this.explorerUrl + '?keywords=' + keywords + '&university_id=' + universityId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  exploreByCountry(keywords, countryId): Observable<any[]> {
    this.googleAnalyticsEventsService.emitEvent("explorer", "explore_by_country: " + countryId, keywords, 1);
    let data = {'event_type': 'explore_by_country', 'event_data': {'country_id': countryId, "keywords": keywords}};
    this.eventsService.emitEvent(data).subscribe(()=>{});;

    return this.http.get(this.explorerUrl + '?keywords=' + keywords + '&country_id=' + countryId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  getCoursesByProgram(programId): Observable<Course[]> {
    return this.http.get(this.coursesByProgramUrl + programId + '/courses/')
      .map(res => res.json().data.items as Course[]).catch(this.handleError);
  }

  compareByFaculty(courseId, facultyId): Observable<any[]> {
    this.googleAnalyticsEventsService.emitEvent("comparator", "compare_by_faculty: " + facultyId, courseId, 1);
    let data = {'event_type': 'compare_by_faculty', 'event_data': {'faculty_id': facultyId, "course_id": courseId}};
    this.eventsService.emitEvent(data).subscribe(()=>{});;
    return this.http.get(this.comparatorUrl + '?course=' + courseId + '&faculty_id=' + facultyId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  compareExternalByFaculty(externalDescription, facultyId): Observable<any[]> {
    this.googleAnalyticsEventsService.emitEvent("comparator", "compare_external_by_faculty: " + facultyId, externalDescription, 1);
    let data = {
      'event_type': 'compare_external_by_faculty',
      'event_data': {'faculty_id': facultyId, "course_description": externalDescription}
    };
    this.eventsService.emitEvent(data).subscribe(()=>{});;
    return this.http.post(this.comparatorTextUrl + '?faculty_id=' + facultyId + '&/', {'course_description': externalDescription})
      .map(res => res.json().data.items).catch(this.handleError);
  }

  compareByUniversity(courseId, universityId): Observable<any[]> {
    this.googleAnalyticsEventsService.emitEvent("comparator", "compare_by_university: " + universityId, courseId, 1);
    let data = {
      'event_type': 'compare_by_university',
      'event_data': {'university_id': universityId, "course_id": courseId}
    };
    this.eventsService.emitEvent(data).subscribe(()=>{});;
    return this.http.get(this.comparatorUrl + '?course=' + courseId + '&university_id=' + universityId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  compareExternalByUniversity(externalDescription, universityId): Observable<any[]> {
    this.googleAnalyticsEventsService.emitEvent("comparator", "compare_external_by_university: " + universityId, externalDescription, 1);
    let data = {
      'event_type': 'compare_external_by_university',
      'event_data': {'university_id': universityId, "course_description": externalDescription}
    };
    this.eventsService.emitEvent(data).subscribe(()=>{});;
    return this.http.post(this.comparatorTextUrl + '?university_id=' + universityId + '&/', {'course_description': externalDescription})
      .map(res => res.json().data.items).catch(this.handleError);
  }

  compareByCountry(courseId, countryId): Observable<any[]> {
    this.googleAnalyticsEventsService.emitEvent("comparator", "compare_by_country: " + countryId, courseId, 1);
    let data = {'event_type': 'compare_by_country', 'event_data': {'country_id': countryId, "course_id": courseId}};
    this.eventsService.emitEvent(data).subscribe(()=>{});;
    return this.http.get(this.comparatorUrl + '?course=' + courseId + '&country_id=' + countryId + '&/')
      .map(res => res.json().data.items).catch(this.handleError);
  }

  compareExternalByCountry(externalDescription, countryId): Observable<any[]> {
    this.googleAnalyticsEventsService.emitEvent("comparator", "compare_external_by_country: " + countryId, externalDescription, 1);
    let data = {
      'event_type': 'compare_external_by_country',
      'event_data': {'country_id': countryId, "course_description": externalDescription}
    };
    this.eventsService.emitEvent(data).subscribe(()=>{});;
    return this.http.post(this.comparatorTextUrl + '?country_id=' + countryId + '&/', {'course_description': externalDescription})
      .map(res => res.json().data.items).catch(this.handleError);
  }

  getSimilarToCourse(courseId): Observable<Course[]> {
    return this.http.get(this.comparatorUrl + '?course=' + courseId)
      .map(res => res.json().data.items).catch(this.handleError);
  }

  getAllCommentsByCourse(courseId): Observable<Comment[]> {
    return this.http.get(this.coursesUrl + courseId + '/comments/')
      .map(res => res.json().data.items as Comment[]).catch(this.handleError);
  }

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


