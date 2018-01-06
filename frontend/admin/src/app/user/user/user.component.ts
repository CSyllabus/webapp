import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../course/course';
import {User} from '../user';
import {environment} from '../../../environments/environment';
import {FormControl, Validators} from '@angular/forms';

import {CountriesService} from '../../services/countries.service';
import {UniversitiesService} from '../../services/universities.service';
import {FacultiesService} from '../../services/faculties.service';

import {Country} from '../../classes/country';
import {University} from '../../classes/university';
import {Faculty} from '../../classes/faculty';



@Component({
  selector: 'app-category',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  user: User;
  newPassword: string;
  newPassword2: string;
  selected: string = 'Select University/Faculty';
  user_id: number;
  task: string;
  countries: Country[];
  universities: University[];
  faculties: Faculty[];


  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',);
  password2 = new FormControl('',);
  pokemonControl: FormControl = new FormControl();

  queryHomeUniversity: University;
  queryHomeFaculty: Faculty;
  queryHomeCountry: Country;


  constructor(private usersService: UsersService, private facultiesService: FacultiesService, private universitiesService: UniversitiesService, private countriesService: CountriesService,  private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user_id = +params['id'];
      this.task = params['task'];

      if (this.task === 'edit' && this.user_id) {
        this.usersService.getUser(this.user_id).subscribe(user => {
          this.user = user;
          console.log(user.facultyId);
        });
      } else if (this.task === 'self') {
        this.usersService.getSelf().subscribe(user => {
          this.user = user;
        });
      } else if (this.task === 'add') {
        this.user = new User();
      }

    });



    this.countriesService.getAllCountries().subscribe(countries => {
      this.countries = countries;
      this.universitiesService.getAllUniversities().subscribe(universities => {
        this.facultiesService.getAllFaculties().subscribe(faculties => {
          for (let country of this.countries) {
            country['universities'] = [];
            country['faculties'] = [];
            for (let university of universities) {
              if (university.countryId === country.id) {
                let flag = true;
                for (let faculty of faculties) {
                  if (faculty.universityId === university.id) {
                    flag = false;
                    country.faculties.push(faculty);
                  }
                  if(faculty.id===this.user.facultyId){
                    this.selected=faculty.name;
                  }
                }
                if (flag) {
                  country.universities.push(university);
                  console.log(university);
                }
              }
            }
          }
        });
      });
    });

  }

  saveUser() {

      let err=false;

      if (this.newPassword && (this.newPassword === this.newPassword2)) {
        this.user['newPassword'] = this.newPassword;
      }
      else if (this.newPassword && (this.newPassword !== this.newPassword2)){
        alert('Passwords do not match!');
        err=true;
      }
      else if (!this.email.value){
        alert('Please enter e-mail address');
        err=true;
      }

      if(!err){

        if (this.task === 'edit' && this.user_id) {
          this.usersService.putUser(this.user_id, this.user).subscribe(res => {
            alert("Succesfully saved edit");
            this.usersService.getUser(this.user_id).subscribe(user => {
              this.user = user;
            });
          }, error => alert(error));
        } else if (this.task === 'self') {
          this.usersService.putSelf(this.user).subscribe(res => {
            alert("Succesfully saved :)");
            this.usersService.getSelf().subscribe(user => {
              this.user = user;
            });
          }, error => alert(error));
        } else if (this.task === 'add' && this.user['newPassword']) {
          this.usersService.postUser(this.user).subscribe(res => {
            alert("Succesfully saved add :)");
          }, error => alert(error));
        }
      }
    }




}
