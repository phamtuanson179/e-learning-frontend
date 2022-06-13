import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SubjectService } from "app/service/api-service/subject.service";
import { SubjectSPT } from "app/model/subject";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.scss"],
})
export class SubjectComponent implements OnInit {
  subject_data: SubjectSPT[];

  constructor(private router: Router, private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.get_all_subjects();
  }

  on_click_subject(subject: SubjectSPT) {
    console.log("abc");
    this.router.navigate(["subject/detail", { id: subject.id }]);
  }

  get_all_subjects() {
    this.subjectService.get_all().subscribe(
      (res: SubjectSPT[]) => {
        console.log(res);
        this.subject_data = res;
      },
      (err) => {
        console.log({ err });
      }
    );
  }
}
