import { Component,Input,OnInit } from '@angular/core';

interface Post {
  id: string;
  title: string,
  permalink: string,
  category: {
    categoryId: string,
    category: string
  }
  postImgPath: string,
  excerpt: string,
  content: string,
  isFeatured: boolean,
  views: number,
  status: string,
  createdAt: Date
}


@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit{
  constructor(){}

  @Input() postData!: Post;

  ngOnInit(): void{
    console.log(this.postData);
  }

}
