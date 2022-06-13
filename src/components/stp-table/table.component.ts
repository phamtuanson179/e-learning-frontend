//properties of table:
// - columns: config column for table
// + attr of column: name, width, tooltip, ellipsis
// + example:
// columns= [
//   {
//    id:'position'
//     name: 'vi tri',
//     width: '25%',
//     ellipsis: false,
//     tooltip:'',
//     align:'center'|'left'|'right',
//    isSort: true
//   },
//   {
//    id:'name'
//     name: 'ten',
//     width: '25%',
//     ellipsis: false,
//     tooltip:'hello'
//   },
// ]
// - DataSource: data of table

import { SelectionModel } from "@angular/cdk/collections";
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
  ViewEncapsulation,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subject } from "rxjs";
@Component({
  selector: "app-stp-base-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() columns: any;
  @Input("dataSource") dataSource!: MatTableDataSource<any>;
  @Input() isLoadingDataAgain!: Subject<Boolean>;
  @Output() selectedDatas = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ContentChild("actionRow") actionRow!: TemplateRef<any>;

  public initialSelection = [];
  public allowMultiSelect = true;
  // @Output() selection = new  EventEmitter<SelectionModel<any>>();
  selection = new SelectionModel<any>(
    this.allowMultiSelect,
    this.initialSelection
  );

  displayedColumns: string[] = [];

  constructor() {}

  ngOnInit(): void {
    // this.setDisplayedColumns();
    this.convertColumns();
  }

  convertColumns() {
    for (let item of this.columns) {
      this.displayedColumns.push(item?.id);
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  handleSortChange(sortState: Sort) {
    if (sortState.direction === "asc") {
      this.dataSource.data.sort((item_1, item_2) => {
        if (item_1[sortState.active].value < item_2[sortState.active].value)
          return -1;
        else return 1;
      });
    } else if (sortState.direction === "desc") {
      this.dataSource.data.sort((item_1, item_2) => {
        if (item_1[sortState.active].value > item_2[sortState.active].value)
          return -1;
        else return 1;
      });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  onChangeCheckboxTD(element: any) {
    this.selection.toggle(element);
    this.selectedDatas.emit(this.selection);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectedDatas.emit(this.selection);
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
      this.selectedDatas.emit(this.selection);
    }

    //   this.isAllSelected() ?
    //       this.selection.clear() :
    //       this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // previousIndex: number
  // setDisplayedColumns() {
  //   this.columns.forEach(( colunm, index) => {
  //     colunm.index = index;
  //     this.displayedColumns[index] = colunm.id;
  //   });
  // }
  // dragStarted(event: CdkDragStart, index: number ) {
  //   this.previousIndex = index;
  // }

  // dropListDropped(event: CdkDropList, index: number) {
  //   if (event) {
  //     moveItemInArray(this.columns, this.previousIndex, index);
  //     this.setDisplayedColumns();
  //   }
  // }
}
