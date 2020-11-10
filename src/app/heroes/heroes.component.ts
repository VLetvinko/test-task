import { Component, OnInit } from '@angular/core';
import {Image} from '../image';
import {ImageService} from '../image.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  images: Image[];
  imgUrl: any;
  selectedFile: File = null;

  constructor(private imageService: ImageService, private http: HttpClient) { }

  ngOnInit() {
    this.getImg();
  }

  drop(event: CdkDragDrop<{name: string}[]>) {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
  }

  getImg(): void {
    this.imageService.getImages()
      .subscribe(img => this.images = img);
  }

  onSelectFile(event) {
    this.selectedFile = event.target.files[0];
    const fd = new FormData();

    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post('http://localhost:3000/files', fd)
      .subscribe(res => {
        console.log('res: ', res);
      });
    this.add('http://localhost:3000/files/' + this.selectedFile.name);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.imageService.addHero({ name } as Image)
      .subscribe(text => {
        this.images.push(text);
      });
  }
}
