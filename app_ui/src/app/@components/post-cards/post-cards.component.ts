import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-cards',
  templateUrl: './post-cards.component.html',
  styleUrls: ['./post-cards.component.scss']
})
export class PostCardsComponent implements OnInit {

  @Input() post
  image: string
 
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.image = this.post.image.includes('null') ? null : this.post.image
  }

  showPost(id) {
    console.log(id)
    this.router.navigateByUrl(`/publication/${id}`)
  }

}
