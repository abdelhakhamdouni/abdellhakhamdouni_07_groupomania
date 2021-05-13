import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment
  @Input() user

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(classe: string) {
    document.querySelector(`.${classe}`).classList.toggle('show')
  }

}
