import { Component,OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

interface Category {
  id?: string;
  category: string
}

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit{
  categoryArray: Category[] = [];

  constructor( private categoryService: CategoriesService){}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val: any[]) =>{
      this.categoryArray = val.map(c => ({id: c.id,category: c.data.category}));
    });
  }

}
