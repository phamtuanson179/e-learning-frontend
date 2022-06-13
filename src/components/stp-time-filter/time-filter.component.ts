import { SelectionModel } from '@angular/cdk/collections';
import {
  CdkDragDrop,
  CdkDragStart,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
// import { TIME_FILTER_TYPE } from 'src/constants/type';
@Component({
  selector: 'app-stp-time-filter',
  templateUrl: './time-filter.component.html',
  styleUrls: ['./time-filter.component.scss'],
})
export class TimeFilterComponent implements OnInit {
  //config for time&date picker: don't allow empty
  nzAllowEmpty = false;

  //var to communicate with other components
  @Input() start: any;
  @Input() end: any;
  @Output() time_change = new EventEmitter<any>();

  // const
  TIME_FILTER_TYPE = TIME_FILTER_TYPE;

  start_date: any;
  end_date: any;

  start_time: any;
  end_time: any;

  ngOnInit(): void {
    this.init_time();
  }

  init_time() {
    const now = new Date();
    if (this.start) {
      this.start_date = this.start;
      this.start_time = this.start;
    } else {
      this.start_date = now;
      this.start_time = now;
    }

    if (this.end) {
      this.end_date = this.end;
      this.end_time = this.end;
    } else {
      this.end_date = now;
      this.end_time = now;
    }
  }

  on_change_time(time_type: string) {
    if (time_type == this.TIME_FILTER_TYPE.START) {
      this.time_change.emit({
        time: new Date(
          this.start_date.getFullYear(),
          this.start_date.getMonth(),
          this.start_date.getDate(),
          this.start_time.getHours(),
          this.start_time.getMinutes(),
          this.start_time.getSeconds()
        ),
        type: TIME_FILTER_TYPE.START,
      });
    } else {
      this.time_change.emit({
        time: new Date(
          this.end_date.getFullYear(),
          this.end_date.getMonth(),
          this.end_date.getDate(),
          this.end_time.getHours(),
          this.end_time.getMinutes(),
          this.end_time.getSeconds()
        ),
        type: TIME_FILTER_TYPE.END,
      });
    }
  }
}

export const TIME_FILTER_TYPE = {
  START: 'start',
  END: 'end',
};