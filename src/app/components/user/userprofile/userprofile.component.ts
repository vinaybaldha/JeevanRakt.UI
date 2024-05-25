import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { userinfo } from '../../../models/Employee';
import { CommonModule, Location } from '@angular/common';
import { AccountService } from '../../../services/account.service';
import { MaterialModule } from '../../../_module/Material.Module';
import { Upload } from '../../../models/UploadImage';
import { Store } from '@ngrx/store';
import { uploadImage } from '../../../_store/user/user.actions';
import { loadSpinner } from '../../../_store/Globel/globel.actions';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  profileDetails!: userinfo;
  user!: userinfo;
  edited: boolean = false;
  imagePreview: any;
  upload: Upload = new Upload();
  formData = new FormData();

  constructor(
    private authService: AccountService,
    private _location: Location,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getProfileDetails();
  }

  editProfile() {
    this.edited = true;
    this.user = this.profileDetails;
  }

  getProfileDetails() {
    this.profileDetails = this.authService.getUserDataFromStorage();
  }

  updateUserProfile() {
    this.authService.UpdateUserProfile(this.user).subscribe(
      (data) => {
        console.log('UserProfile Updated succesfully');
      },
      (error) => {
        console.log('Profile Updation Failed');
        console.log(error.error);
      }
    );
  }

  goback() {
    this.edited = false;
    this.user = {
      employeeName: '',
      email: '',
      phoneNumber: '',
      token: '',
      filePath: '',
      role: '',
      bloodBankId: '',
    };
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.previewImage(file);
      this.formData.append('file', file);
      this.formData.append('fileName', file.name);
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
  }

  uploadImage() {
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(uploadImage({ image: this.formData }));
  }
}
