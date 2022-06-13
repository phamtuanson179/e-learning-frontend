import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
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
    add_modal: "Thêm thông tin môn học",
    edit_modal: "Cập nhật thông tin môn học",
    delete_popover: "Xóa môn học",
  };
  subject_datas: SubjectSPT[];
  subject_datas_table = new MatTableDataSource<any>();
  table_columns: STPColumnTable[] = TABLE_COLUMNS;
  is_loading_data_again = new Subject<Boolean>();
  is_close_edit_modal = new Subject<Boolean>();
  constructor(private subject_service: SubjectService) {}
  ngOnInit(): void {
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
