import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UniversitiesService } from '../../services/universities.service';
import { University } from '../../classes/university';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})

/**
 * UniversityComponent object displaying the relative informations
 * from a university id
 * <p>
 * @author CSyllabus Team
 */
export class UniversityComponent implements OnInit {
  /**
   * The {@link University} instance representing the university displayed
   */
  university: University;
  explore: number;
  pageHit: number;
  compareNormal: number;
  compareCrazy: number;
  compare : number;
  maxno : number;

  explore2: number;
  pageHit2: number;
  compare2: number;


  /**
   * @constructor create UniversityComponent object.
   * @param route The {@link ActivatedRoute} instance representing route.
   * @param router The {@link Router} instance representing Router.
   * @param universitiesService The {@link UniversitiesService} service to subscribe UniversitiesService.
   */
  constructor(private route: ActivatedRoute, private router: Router, private universitiesService: UniversitiesService) {

  }

  /**
   * ngOnInit Sets the {@link University} instance representing university
   * given by his id.
   */
  ngOnInit() {

    this.route.params.subscribe(params => {

      this.universitiesService.getUniversityById(+params['id']).subscribe(university => {
        this.university = university;

        if (university === undefined) {
          this.router.navigate(['not-found']);
        } else {

          if(university.id==1){
            this.universitiesService.getExplore(university.id).subscribe(result => {
              this.explore = result;

              this.universitiesService.getPageHit(university.id).subscribe(result => {
                this.pageHit = result;

                this.universitiesService.getCompareNormal(university.id).subscribe(result => {
                  this.compareNormal = result;

                  this.universitiesService.getCompareCrazy(university.id).subscribe(result => {
                    this.compareCrazy = result;

                    this.compare=this.compareNormal+this.compareCrazy;

                    this.maxno=Math.max(this.explore, this.pageHit, this.compare);

                    this.explore2 = this.explore*100/this.maxno;
                    this.pageHit2 = this.pageHit*100/this.maxno;
                    this.compare2 = this.compare*100/this.maxno;




                    });
                });
              });
            });




          }


        }
        });
      });
    };
  }


