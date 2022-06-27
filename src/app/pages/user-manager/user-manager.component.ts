import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { STPColumnTable } from "app/model/front-end";
import { SubjectSPT } from "app/model/subject";
import { User } from "app/model/user";
import { SubjectService } from "app/service/api-service/subject.service";
import { UserService } from "app/service/api-service/user.service";
import { ToastService } from "components/stp-toast/toast-service";
import { Subject } from "rxjs";
import { list_roles } from "utils/customArray";
import { convert_role_be_to_fe } from "utils/customString";

import { v4 } from "uuid";
@Component({
  selector: "app-user-manager",
  templateUrl: "./user-manager.component.html",
  styleUrls: ["./user-manager.component.scss"],
})
export class UserManagerComponent implements OnInit {
  public title = {
    title_page: "Quản lý người dùng",
    add_modal: "Thêm người dùng",
    edit_modal: "Cập nhật thông tin người dùng",
    delete_popover: "Xóa người dùng",
  };

  user_form: FormGroup;
  subject_datas: SubjectSPT[];
  user_datas: User[];
  edit_element_id: string;
  user_datas_table = new MatTableDataSource<any>();
  table_columns: STPColumnTable[] = TABLE_COLUMNS;
  is_loading_data_again = new Subject<Boolean>();
  is_close_edit_modal = new Subject<Boolean>();
  is_close_add_modal = new Subject<Boolean>();
  list_roles: any[];
  constructor(
    private user_service: UserService,
    private subject_service: SubjectService,
    private toast_service: ToastService
  ) {}
  ngOnInit(): void {
    this.user_form = new FormGroup({
      username: new FormControl(""),
      fullname: new FormControl(""),
      avatar: new FormControl(""),
      password: new FormControl(),
      dob: new FormControl(),
      role: new FormControl(),
      email: new FormControl(),
      list_subjects_id: new FormControl(),
    });

    this.get_all_subject();

    this.is_loading_data_again.subscribe((res) => {
      if (res) {
        this.get_all_user();
      }
    });

    this.is_loading_data_again.next(true);

    this.list_roles = list_roles();
  }

  get_all_subject() {
    this.subject_service.get_all().subscribe((res) => {
      this.subject_datas = res;
    });
  }

  get_all_user() {
    this.user_service.get_all().subscribe((res) => {
      this.user_datas = res;
      this.user_datas_table.data = this.convert_user_data_to_table_data(
        this.user_datas
      );
    });
  }

  convert_user_data_to_table_data(data: User[]) {
    console.log(data);
    return data?.map((item, idx) => {
      const new_item = {
        username: {
          value: item?.username,
        },
        email: {
          value: item?.email,
        },
        role: {
          value: convert_role_be_to_fe(item?.role),
        },
        fullname: {
          value: item?.fullname,
        },
        dob: {
          value: item?.dob,
        },
        subjects: {
          value: item?.dob,
        },
        id: item?.id,
        detail_data: item,
      };
      return new_item;
    });
  }

  render_list_role() {
    return list_roles();
  }

  on_click_edit(id: string, element: SubjectSPT) {
    console.log({ element });
    this.edit_element_id = id;
    this.user_form.patchValue({
      name: element.name,
      alias: element.alias,
      min_correct_question_to_pass: element.min_correct_question_to_pass,
      amount_question: element.amount_question,
      description: element.description,
      time: element.time,
      avatar: element.avatar,
    });
  }

  on_click_add() {
    this.user_form.reset();
  }

  change_avatar(e: string) {
    this.user_form.patchValue({
      avatar: e,
    });
  }

  on_submit_edit_form() {
    let data = this.user_form.value;
    data = { ...data, id: this.edit_element_id };
    const params = {
      id: this.edit_element_id,
    };
    this.user_service.update(data, params).subscribe((res) => {
      this.is_close_edit_modal.next(true);
      this.is_loading_data_again.next(true);
      this.toast_service.show("Chỉnh sửa thông tin người dùng thành công!", {
        classname: "bg-success text-light",
      });
    });
  }

  on_submit_add_form() {
    let data = this.user_form.value;
    data.id = v4();
    this.user_service.create(data).subscribe(
      (res) => {
        this.is_close_add_modal.next(true);
        this.is_loading_data_again.next(true);
        this.toast_service.show("Thêm người dùng thành công!", {
          classname: "bg-success text-light",
        });
      },
      (err) => {
        this.toast_service.show("Xóa môn học thất bại!", {
          classname: "bg-danger text-light",
        });
      }
    );
  }

  delete(id: string) {
    const params = {
      id: id,
    };
    this.subject_service.delete(params).subscribe(
      (res) => {
        this.toast_service.show("Xóa môn học thành công!", {
          classname: "bg-success text-light",
        });
        this.is_loading_data_again.next(true);
      },
      (err) => {
        this.toast_service.show("Xóa môn học thất bại!", {
          classname: "bg-danger text-light",
        });
      }
    );
  }
}

export const TABLE_COLUMNS: STPColumnTable[] = [
  {
    id: "fullname",
    name: "Tên người dùng",
    width: "15%",
  },
  {
    id: "username",
    name: "Tên đăng nhập",
    width: "15%",
  },
  {
    id: "email",
    name: "Email",
    width: "10%",
  },
  {
    id: "dob",
    name: "Ngày sinh",
    width: "10%",
  },
  {
    id: "subjects",
    name: "Môn học",
    width: "10%",
  },
  {
    id: "role",
    name: "Vai trò",
    width: "10%",
  },
  {
    id: "action",
    name: "",
    width: "10%",
  },
];
