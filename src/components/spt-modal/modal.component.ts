import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stp-base-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() isClose!: Subject<Boolean>;
  @Input()
  width!: string;
  @Input() title!: string;

  //for config modal
  config: any;
  @Input() isBackdropClick: boolean;

  //for icon close
  @Input() isHaveIconClose: boolean;

  modalRef!: BsModalRef;

  @ViewChild('baseModal') baseModal: any;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    this.isClose.subscribe((res) => {
      if (res) {
        this.closeModal();
      } else {
        this.openModal(this.baseModal);
      }
    });

    this.config = {
      ignoreBackdropClick: this.isBackdropClick ? this.isBackdropClick : false,
    };
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign(this.config, {
        class: `w-${
          this.width ? this.width : '50'
        } mw-100  modal-dialog-centered`,
      })
    );
  }

  closeModal() {
    this.modalRef?.hide();
  }

  add(value: any) {
    console.log({ value });
  }
}
