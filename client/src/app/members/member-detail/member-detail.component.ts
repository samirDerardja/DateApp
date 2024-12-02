import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Member } from '../../_appModels/member';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { NgFor } from '@angular/common';
 
@Component({
  selector: 'app-member-detail',
  standalone: true, 
  imports: [GalleryModule, NgFor],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {


  ngOnInit(): void {
 this.loadMember();
  } 


  memberService = inject(MembersService);
  private route  = inject(ActivatedRoute);
  member?: Member;
  images: GalleryItem[] = [];

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        member.photos.map(p => {
          this.images.push(new ImageItem({src: p.url, thumb: p.url}))
        })
      }
    })
  }
}
