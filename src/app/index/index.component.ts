import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalComponent, NzModalContentDirective, NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/localStorage.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonComponent,
    NzModalComponent,
    NzModalContentDirective,
    NzButtonModule,
    NzModalModule,
    NzFormDirective,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzInputDirective,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  readonly #fb = inject(FormBuilder);
  readonly #localStorageService = inject(LocalStorageService);

  isVisible = false;
  isOkLoading = false;

  userForm = this.#fb.group({
    userName: [''],
    email: [''],
  });

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.isVisible = false;
    this.isOkLoading = false;

    this.#localStorageService.setItem(this.userForm.value);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm() {
    console.log('form submit');
  }
}
