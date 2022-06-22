import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { STPColumnTable } from "app/model/front-end";
import { SubjectSPT } from "app/model/subject";
import { SubjectService } from "app/service/api-service/subject.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-subject-manager",
  templateUrl: "./subject-manager.component.html",
  styleUrls: ["./subject-manager.component.scss"],
})
export class SubjectManagerComponent implements OnInit {
  public title = {
    title_page: "Quản lý môn học",
    add_modal: "Thêm môn học",
    edit_modal: "Cập nhật môn học",
    delete_popover: "Xóa môn học",
  };

  subject_form: FormGroup;
  subject_datas: SubjectSPT[];
  edit_element_id: string;
  subject_datas_table = new MatTableDataSource<any>();
  table_columns: STPColumnTable[] = TABLE_COLUMNS;
  is_loading_data_again = new Subject<Boolean>();
  is_close_edit_modal = new Subject<Boolean>();
  constructor(private subject_service: SubjectService) {}
  ngOnInit(): void {
    this.subject_form = new FormGroup({
      name: new FormControl(""),
      alias: new FormControl(""),
      time: new FormControl(),
      amount_question: new FormControl(),
      min_correct_question_to_pass: new FormControl(""),
      description: new FormControl(""),
      avatar: new FormControl(""),
    });

    this.get_all_subject();
    this.is_loading_data_again.subscribe((res) => {
      if (res) {
        this.get_all_subject();
        this.is_loading_data_again.next(false);
      }
    });
  }

  get_all_subject() {
    this.subject_service.get_all().subscribe((res) => {
      this.subject_datas = res;
      this.subject_datas_table.data = this.convert_subject_data_to_table_data(
        this.subject_datas
      );
    });
  }

  convert_subject_data_to_table_data(data: SubjectSPT[]) {
    console.log(data);
    return data?.map((item, idx) => {
      const new_item = {
        idx: {
          value: idx + 1,
        },
        name: {
          value: item?.name,
        },
        alias: {
          value: item?.alias,
        },
        time: {
          value: item?.time,
        },
        amount_question: {
          value: item?.amount_question,
        },
        min_correct_question_to_pass: {
          value: item?.min_correct_question_to_pass,
        },
        description: {
          value: item?.description,
        },
        id: item?.id,
        detail_data: item,
      };
      return new_item;
    });
  }

  on_click_edit(id: string, element: SubjectSPT) {
    console.log({ element });
    this.edit_element_id = id;
    this.subject_form.patchValue({
      name: element.name,
      alias: element.alias,
      min_correct_question_to_pass: element.min_correct_question_to_pass,
      amount_question: element.amount_question,
      description: element.description,
      time: element.time,
      avatar: element.avatar,
    });
  }

  change_avatar(e: string) {
    this.subject_form.patchValue({
      avatar: e,
    });
  }

  on_submit_edit_form() {
    let data = this.subject_form.value;
    data = { ...data, id: this.edit_element_id };
    const params = {
      id: this.edit_element_id,
    };
    this.subject_service.update(data, params).subscribe((res) => {
      console.log({ res });
    });
  }

  delete(id: string) {}
}

export const TABLE_COLUMNS: STPColumnTable[] = [
  {
    id: "idx",
    name: "STT",
    width: "5%",
  },
  {
    id: "name",
    name: "Tên môn học",
    width: "15%",
  },
  {
    id: "alias",
    name: "Mã môn học",
    width: "10%",
  },
  {
    id: "time",
    name: "Thời gian thi",
    width: "10%",
  },
  {
    id: "amount_question",
    name: "Số câu hỏi",
    width: "10%",
  },
  {
    id: "min_correct_question_to_pass",
    name: "Số câu đúng tối thiểu",
    width: "10%",
  },
  {
    id: "description",
    name: "Mô tả",
    width: "30%",
    ellipsis: true,
  },
  {
    id: "action",
    name: "",
    width: "10%",
  },
];
