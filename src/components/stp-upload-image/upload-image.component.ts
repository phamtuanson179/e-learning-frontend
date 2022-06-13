import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stp-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() image: any;
  @Input() width!: string;
  @Input() height!: string;
  @Input() type!: string;
  @Output() imageData: EventEmitter<any> = new EventEmitter<any>();
  preview: any = document.getElementById('wizardPicturePreview');

  constructor() {
    this.uploadImage = this.uploadImage.bind(this);
    this.preview = document.getElementById('wizardPicturePreview');
    // this.preview.style.backgroundImage = `url(${this.image ? this.image : 'assets/plus_icon.png'})`
  }

  ngOnInit(): void {}

  uploadImage(e: any) {
    const img = document.getElementById('wizard-picture');
    if (window.FileReader) {
      var file = e.target.files[0];
      var reader = new FileReader();
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);
      } else {
        if(img){
          img.style.display = 'none';
        img.setAttribute('src', '');
        }
      }
      reader.onloadend = (e) => {
        const result = reader.result;
        this.image = result;
        this.imageData.emit(result);
        if(img)
          img.style.display = 'block';
      };
    }
  }
}
