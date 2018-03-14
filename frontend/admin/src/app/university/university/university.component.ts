import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {UniversitiesService} from '../universities.service';
import {UsersService} from '../../user/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {University} from '../university';
import {User} from '../../user/user';
import {environment} from '../../../environments/environment';
import {FormControl} from '@angular/forms';

import {FacultiesService} from '../../services/faculties.service';

import {Country} from '../../classes/country';
import {Faculty} from '../../classes/faculty';

declare let window: any;
let self: any;

@Component({
  selector: 'app-university',
  templateUrl: './university.html',
  styleUrls: ['./university.css']
})
export class UniversityComponent implements OnInit {
  categoryControl: FormControl = new FormControl();
  pokemonControl: FormControl = new FormControl();

  university: University;
  university_id: Number;
  author: User;
  keywords: any = [];
  keywordInput: string = "";
  countries: Country[];
  allow_access: boolean;
  isadmin: boolean;
  universities: University[];
  faculties: Faculty[];
  selected: string = 'Select University/Faculty';
  private universityImg: string;
  file: File;

  constructor(private facultiesService: FacultiesService, private universitiesService: UniversitiesService, private usersService: UsersService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    self = this;
    this.university = new University();

    this.usersService.checkUser().subscribe(res => {
      this.isadmin = res;
    });

    this.route.params.subscribe(params => {
      self.university_id = +params['id'];
      self.task = params['task'];
      if (self.university_id) {
        self.fetchUniversityData(+params['id']);
        self.universityImg = self.university.img;
      }

    });


  }

  setMainImgToDefault() {
    this.university.img = "http://howmadareyou.com/wp-content/themes/MAD/images/default_profile_image.png";
  }

  onImageInputChange(event: any) {
    const files: FileList = event.target.files;
    this.file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const target: any = e.target;
      this.universityImg = target.result;
      this.university.img = this.universityImg;
    };
    reader.readAsDataURL(this.file);
  }

  addKeyword() {
    let keyword = {value: this.keywordInput, remove: false};
    this.keywordInput = "";
    this.keywords.push(keyword);
  }

  saveUniversity(showSameUniversity) {
    self.university.keywords = [];

    self.keywords.forEach(function (keyword) {
      if (!keyword.remove) {
        self.university.keywords.push(keyword.value);
      }
    });


    if (self.task !== 'edit') self.university.id = undefined;
    if (self.university.id) {
      this.universitiesService.universityExisting(self.university.id, self.university).subscribe(res => {
        alert("Succesfully saved. Results in the comprator will be changed with a scheduled update (once a week) :)");
        self.fetchUniversityData(self.university_id);
      }, error => alert(error));

    }
  }

  addUniversity() {
    self.university.keywords = [];

    self.keywords.forEach(function (keyword) {
      if (!keyword.remove) {
        self.university.keywords.push(keyword.value);
      }
    });


    this.universitiesService.universityNew(self.university).subscribe(res => {

      alert("Succesfully added a new university. It will be added to comparator result on a next scheduled update (once a week) :)");
      this.router.navigate(['universities/']);


    }, error => alert(error));


  }

  fetchUniversityData(university_id) {
    /*
        this.usersService.checkUserUniversity(university_id).subscribe(res => {
          this.allow_access = res;

        });*/

    self.keywords = [];
    self.universitiesService.getUniversity(university_id).subscribe(university => {
      self.university = university;

      console.log(university);


    });
  }


}
