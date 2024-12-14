import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member } from '../../_appModels/member';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../_services/account.service';
import { environment } from '../../../environments/environment.development';
import { MembersService } from '../../_services/members.service';
import { Photo } from '../../_appModels/photo';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgFor,NgIf, NgStyle, NgClass, FileUploadModule, DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {

  private accountService = inject(AccountService);
  member = input.required<Member>();
  uploader?:FileUploader;
  baseUrl = environment.apiUrl;
  hasBaseDropZoneOver = false;
  memberChange = output<Member>();
  private memberService = inject(MembersService);
  private toast = inject(ToastrService)
   
  
  ngOnInit(): void {
    this.initialUploader();
  }

  fileOverBase(e:any) {
    this.hasBaseDropZoneOver = e;
  }

  initialUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024

    });

    this.uploader.onAfterAddingFile = (file) =>  {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, hearders) => {
        const photo = JSON.parse(response);
        const updateMember = {...this.member()}
        updateMember.photos.push(photo);
        this.memberChange.emit(updateMember);
    }
  }

  setMainPhoto(photo:Photo){
    this.memberService.setMainPhoto(photo).subscribe({
      next: _ =>{
        const user = this.accountService.currentUser();
        if(user) {
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user);
        }

        const updateMember = {...this.member()}
        updateMember.photoUrl = photo.url;
        updateMember.photos.forEach(p => {
          if(p.isMain) p.isMain = false;
          if(p.id === photo.id) p.isMain = true;
        });
        this.memberChange.emit(updateMember);
        this.toast.success('Modifier avec Succès')
      }
    })
  } 

  deletePhoto(photo:Photo) {
    this.memberService.deletePhoto(photo).subscribe({
      next: _ => {
        if(this.member != null) {
          const updateMember = {...this.member()};
        updateMember.photos = updateMember.photos.filter(x => x.id != photo.id);
        this.memberChange.emit(updateMember);
        this.toast.success('photo supprimer avec succès')
        }
      }
    })
     
  }


  
 
}
