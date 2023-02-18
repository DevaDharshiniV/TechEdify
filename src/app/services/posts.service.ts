import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

import * as firebase from 'firebase/compat/app';

interface Post {
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


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore) { }


  loadFeatured() {

    return this.afs.collection('posts', ref=> ref.where('isFeatured','==', true).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        }) as Array<{id: string, data: Post}>;
      })
    );

  }

  loadLatest(){
    return this.afs.collection('posts', ref=> ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        }) as Array<{id: string, data: Post}>;
      })
    );

  }

  loadCategoryPosts(categoryId: string){
    return this.afs.collection('posts', ref=> ref.where('category.categoryId', '==',categoryId).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        }) as Array<{id: string, data: Post}>;
      })
    );

  }

  loadOnePost( postId: string ){
    return this.afs.doc(`posts/${postId}`).valueChanges();

  }

  loadSimilar(catId: string){
    return this.afs.collection('posts', ref=> ref.where('category.categoryId', '==', catId).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        }) as Array<{id: string, data: Post}>;
      })
    );


  }

  countViews(postId: string){
    const viewsCount = {
      views: firebase.default.firestore.FieldValue.increment(1)
    }
    this.afs.doc(`posts/${postId}`).update(viewsCount).then(() =>{
      console.log('Views count updated ..!');
    })
  }

}
