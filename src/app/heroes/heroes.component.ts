import { Component, OnInit } from '@angular/core';
import {Image} from '../image';
import { HEROES } from '../mock-heroes';
import {ImageService} from '../image.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  images: Image[];
  imgUrl: any;

  constructor(private imageService: ImageService) { }

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
    this.imgUrl = 'assets/image/' + event.target.files[0].name;
    console.log(this.imgUrl);
    this.add(this.imgUrl);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.imageService.addHero({ name } as Image)
      .subscribe(text => {
        this.images.push(text);

        // console.log(text);
      });
  }
}
