import { Component,OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';


interface Post {
  id: string
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  featuredPostsArray: Post[] =[];
  latestPostsArray : Post[] =[];

  constructor( private postService: PostsService ){}

  ngOnInit(): void {
    this.postService.loadFeatured().subscribe(val => {
      this.featuredPostsArray = val.map(post => {
        const timestamp = post.data.createdAt as unknown as firebase.firestore.Timestamp;
        return {
          id: post.id,
          ...post.data,
          category: {
            categoryId: post.data.category.categoryId,
            category: post.data.category.category
          },
          createdAt: new Date(timestamp.seconds * 1000)
        };
      });
    });

    this.postService.loadLatest().subscribe(val => {
      this.latestPostsArray = val.map(post => {
        const timestamp = post.data.createdAt as unknown as firebase.firestore.Timestamp;
        return {
          id: post.id,
          ...post.data,
          category: {
            categoryId: post.data.category.categoryId,
            category: post.data.category.category
          },
          createdAt: new Date(timestamp.seconds * 1000)
        };
      });
    });


  }


}
