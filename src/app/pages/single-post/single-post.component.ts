import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
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
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  postData: any;
  similarPostArray: Post[]=[];

  constructor( private route: ActivatedRoute,private postsService: PostsService){}

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.postsService.countViews(val['id']);
      this.postsService.loadOnePost(val['id']).subscribe(post => {
        // console.log(post);
        this.postData=post;
        this.loadSimilarPost(this.postData.category.categoryId);
      })
    })
  }
  loadSimilarPost(catId: string){
    this.postsService.loadSimilar(catId).subscribe(val => {
      this.similarPostArray=val.map(post => {
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
  }

}
