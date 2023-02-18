import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import firebase from 'firebase/compat';
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
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit{

  postsArray : Post[] =[];
  categoryObj: any;

  constructor( private route: ActivatedRoute, private postService: PostsService){}

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      console.log(val);
      this.categoryObj = val;
      this.postService.loadCategoryPosts(val['id']).subscribe(post => {
        this.postsArray = post.map(post => {
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
      })
    })
  }
}
