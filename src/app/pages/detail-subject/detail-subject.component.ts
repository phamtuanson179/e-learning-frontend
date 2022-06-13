import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { SubjectSPT } from "app/model/subject";
import { SubjectService } from "app/service/api-service/subject.service";

@Component({
  selector: "app-detail-subject",
  templateUrl: "./detail-subject.component.html",
  styleUrls: ["./detail-subject.component.scss"],
})
export class DetailSubjectComponent implements OnInit {
  subject: any;
  subject_id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.subject_id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.subject_id);
    this.get_subject_by_id(this.subject_id);
  }

  get_subject_by_id(subject_id: string) {
    const params = {
      id: subject_id,
    };
    this.subjectService
      .get_subject_by_id(params)
      .subscribe((res: SubjectSPT) => {
        this.subject = res[0];
        console.log(this.subject);
      });
  }
}
