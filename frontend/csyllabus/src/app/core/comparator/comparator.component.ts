import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CountriesService } from '../../services/countries.service';
import { CitiesService } from '../../services/cities.service';
import { UniversitiesService } from '../../services/universities.service';
import { FacultiesService } from '../../services/faculties.service';
import { CoursesService } from '../../services/courses.service';
import { ProgramsService } from '../../services/programs.service';

import { Course } from '../../classes/course';
import { Country } from '../../classes/country';
import { City } from '../../classes/city';
import { University } from '../../classes/university';
import { Faculty } from '../../classes/faculty';
import { Program } from '../../classes/program';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.css']
})

/**
 * ComparatorComponent object compare the similarity
 * between multiple courses
 * <p>
 * @author CSyllabus Team
 */
export class ComparatorComponent implements OnInit {

  /**
   * The {@link EventEmitter<any>} instance representing the sender to emit the new background.
   */
  @Output() backgroundImage = new EventEmitter<any>();
  /**
   * The {@link EventEmitter<any>} instance representing the sender to emit the result courses.
   */
  @Output() comparatorResult = new EventEmitter<any>();

  /**
   * The {@link Boolean instance representing comparatorStarted.
   */
  comparatorStarted: Boolean;
  /**
   * The list {@link Country} instance representing countries.
   */
  countries: Country[];
  /**
   * The list {@link Course} instance representing courses.
   */
  courses: Course[];
  /**
   * The list {@link City} instance representing cities.
   */
  cities: City[];
  /**
   * The list {@link University} instance representing universities.
   */
  universities: University[];
  /**
   * The list {@link Faculty} instance representing faculties.
   */
  faculties: Faculty[];
  /**
   * The list {@link Program} instance representing programs.
   */
  programs: Program[];

  /**
   * The list {@link City} instance representing filtered Cities.
   */
  filteredCities: City[];
  /**
   * The list {@link University} instance representing filtered Universities.
   */
  filteredUniversities: University[];
  /**
   * The list {@link Faculty} instance representing filtered Faculties.
   */
  filteredFaculties: Faculty[];
  /**
   * The list {@link Faculty} instance representing filtered Home Faculties.
   */
  filteredHomeFaculties: Faculty[];
  /**
   * The list {@link Program} instance representing filtered Home Programs.
   */
  filteredHomePrograms: Program[];
  /**
   * The list {@link Course} instance representing filtered Home Courses.
   */
  filteredHomeCourses: Course[];

  /**
   * The {@link FormControl} instance representing courses Control.
   */
  coursesControl: FormControl = new FormControl();
  /**
   * The {@link FormControl} instance representing cities Control.
   */
  citiesControl: FormControl = new FormControl();
  /**
   * The {@link FormControl} instance representing universities Control.
   */
  universitiesControl: FormControl = new FormControl();
  /**
   * The {@link FormControl} instance representing faculties Control.
   */
  facultiesControl: FormControl = new FormControl();
  /**
   * The {@link FormControl} instance representing home Univ Control.
   */
  homeUnivControl: FormControl = new FormControl();
  /**
   * The {@link FormControl} instance representing home Faculties Control.
   */
  homeFacultiesControl: FormControl = new FormControl();
  /**
   * The {@link FormControl} instance representing home Programs Control.
   */
  homeProgramsControl: FormControl = new FormControl();
  /**
   * The {@link FormControl} instance representing home Courses Control.
   */
  homeCoursesControl: FormControl = new FormControl();

  /**
   * The {@link Country} instance representing queryCountry.
   */
  queryCountry: Country;
  /**
   * The {@link City} instance representing queryCity.
   */
  queryCity: City;
  /**
   * The {@link University} instance representing queryHomeUniversity.
   */
  queryHomeUniversity: University;
  /**
   * The {@link University} instance representing queryUniversity.
   */
  queryUniversity: University;
  /**
   * The {@link Faculty} instance representing queryFaculty.
   */
  queryFaculty: Faculty;
  /**
   * The {@link Faculty} instance representing queryHomeFaculty.
   */
  queryHomeFaculty: Faculty;
  /**
   * The {@link Program} instance representing queryProgram.
   */
  queryProgram: Program;
  /**
   * The {@link Program} instance representing queryHomeProgram.
   */
  queryHomeProgram: Program;
  /**
   * The {@link string} instance representing queryLevel.
   */
  queryLevel: string;
  /**
   * The {@link Course} instance representing queryHomeCourse.
   */
  queryHomeCourse: Course;

  /**
   * @constructor create SearchDialogComponent object.
   * @param coursesService The {@link CoursesService} service to subscribe CoursesService.
   * @param citiesService The {@link CitiesService} service to subscribe CitiesService.
   * @param facultiesService The {@link FacultiesService} service to subscribe FacultiesService.
   * @param countriesService The {@link CountriesService} service to subscribe CountriesService.
   * @param universitiesService The {@link UniversitiesService} service to subscribe UniversitiesService.
   * @param programsService The {@link ProgramsService} service to subscribe ProgramsService.
   */
  constructor(private coursesService: CoursesService, private countriesService: CountriesService,
              private citiesService: CitiesService, private universitiesService: UniversitiesService,
              private facultiesService: FacultiesService, private programsService: ProgramsService) {
  }

  /**
   * ngOnInit
   * Get All the countries {@link Country} instance representing Country.
   * Get All the universities  {@link University} instance representing University.
   */
  ngOnInit() {
    this.countriesService.getAllCountries().subscribe(countries => this.countries = countries);
    this.universitiesService.getAllUniversities().subscribe(universities => this.universities = universities);
  }

  /**
   * filterCitiesByCountry filtering citie given by country id
   * The list {@link City} instance representing filteredCities is updated.
   * The string {@link string} instance representing backgroundImage is updated.
   */
  filterCitiesByCountry() {
    this.queryCity = this.queryUniversity = this.queryFaculty = undefined;
    this.backgroundImage.emit(null);
    if (this.queryCountry && this.queryCountry.id) {
      this.citiesService.getCitiesByCountry(this.queryCountry.id).subscribe(cities => {
        this.filteredCities = cities;
        if (this.queryCountry.img) {
          this.backgroundImage.emit(this.queryCountry.img);
        }
      });
    }
  }

  /**
   * filterUniversitiesByCity filtering universities given by city id
   * The list {@link University} instance representing filteredUniversities is updated.
   * The string {@link string} instance representing backgroundImage is updated.
   */
  filterUniversitiesByCity() {
    this.queryUniversity = this.queryFaculty = undefined;
    this.universitiesService.getUniversitiesByCity(this.queryCity.id).subscribe(universities => {
      this.filteredUniversities = universities;
      if (this.queryCity.img) {
        this.backgroundImage.emit(this.queryCity.img);
      }
    });
  }
  /**
   * filterFacultiesByHomeUniversity filtering faculties given by home university id
   * The list {@link Faculty} instance representing filteredHomeFaculties is updated.
   * The list {@link Program} instance representing filteredHomePrograms is updated.
   * The string {@link string} instance representing backgroundImage is updated.
   */
  filterFacultiesByHomeUniversity() {
    this.queryHomeFaculty = this.queryHomeProgram = this.queryHomeCourse = undefined;
    this.filteredHomeFaculties = [];
    this.facultiesService.getFacultiesByUniversity(this.queryHomeUniversity.id).subscribe(faculties => {
      this.filteredHomeFaculties = faculties;
      console.log(this.queryHomeUniversity);
      if (this.queryHomeUniversity.img) {
        this.backgroundImage.emit(this.queryHomeUniversity.img);
      }
    });

    this.programsService.getProgramsByUniversity(this.queryHomeUniversity.id).subscribe(programs => {
      this.filteredHomePrograms = programs;
      console.log(programs);

    });
  }

  /**
   * filterProgramsByHomeFaculty filtering programs given by home faculty id
   * The list {@link Program} instance representing filteredHomePrograms is updated.
   */
  filterProgramsByHomeFaculty() {
    this.queryHomeProgram = this.queryHomeCourse = undefined;
    this.programsService.getProgramsByFaculty(this.queryHomeFaculty.id).subscribe(programs => {
      this.filteredHomePrograms = programs;
      console.log(programs);

    });
  }
  /**
   * filterCoursesByHomeProgram filtering courses given by home program id
   * The list {@link Course} instance representing filteredHomeCourses is updated.
   */
  filterCoursesByHomeProgram() {
    this.queryHomeCourse = undefined;
    this.coursesService.getCoursesByProgram(this.queryHomeProgram.id).subscribe(courses => {
      this.filteredHomeCourses = courses;
      console.log(courses);

    });
  }

  /**
   * filterFacultiesByUniversity filtering faculties given by university id
   * The list {@link Faculty} instance representing filteredFaculties is updated.
   * The string {@link string} instance representing backgroundImage is updated.
   */
  filterFacultiesByUniversity() {
    this.queryFaculty = undefined;
    this.facultiesService.getFacultiesByUniversity(this.queryUniversity.id).subscribe(faculties => {
      this.filteredFaculties = faculties;
      if (this.queryUniversity.img) {
        this.backgroundImage.emit(this.queryUniversity.img);
      }
    });
  }

  /**
   * filterFacultiesChange emit new background given by the new faculty image
   * The string {@link string} instance representing backgroundImage is updated.
   */
  filterFacultiesChange() {
    if (this.queryFaculty.img) {
      this.backgroundImage.emit(this.queryFaculty.img);
    }
  }

  /**
   * compareCourses emit the courses corresponding to the previous filters
   */
  compareCourses() {

    this.comparatorStarted = true;


    if (this.queryFaculty) {
      this.coursesService.compareByFaculty(this.queryHomeCourse.id, this.queryFaculty.id).subscribe(courses => {
        this.comparatorResult.emit(courses);
        this.comparatorStarted = false;
      });
    } else if (this.queryUniversity) {
      this.coursesService.compareByUniversity(this.queryHomeCourse.id, this.queryUniversity.id).subscribe(courses => {
        this.comparatorResult.emit(courses);
        this.comparatorStarted = false;
      });
    } else if (this.queryCity) {
      this.coursesService.compareByCity(this.queryHomeCourse.id, this.queryCity.id).subscribe(courses => {
        this.comparatorResult.emit(courses);
        this.comparatorStarted = false;
      });
    } else if (this.queryCountry) {
      this.coursesService.compareByCountry(this.queryHomeCourse.id, this.queryCountry.id).subscribe(courses => {
        this.comparatorResult.emit(courses);
        this.comparatorStarted = false;
      });
    }

  }

  /**
   * displaySelect return the name of the element
   * @return the element name
   */
  displaySelect(element: any): string {
    return element ? element.name : '';
  }
}
