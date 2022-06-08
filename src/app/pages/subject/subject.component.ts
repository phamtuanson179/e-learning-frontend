import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  on_click_subject(){
    console.log('abc')
    this.router.navigate(['subject/detail'])
  }

}
