import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const STEP = 100 / 6;
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  addContactForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  progress = {
    value: 3 * STEP,
    textType: 'dark',
    type: 'light',
  };

  constructor(private formBuilder: FormBuilder) {
    this.addContactForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      familyName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      age: [18, [Validators.required, Validators.max(120), Validators.min(18)]],
      monthlyIncome: [1000, [Validators.required, Validators.min(1000)]],
      status: [1, [Validators.required]],
      numberOfChildren: [0],
    });
  }

  ngOnInit(): void {
    this.addContactForm.valueChanges.subscribe((val) => {});
  }

  submitForm(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.isSubmitted = true;
    }, 1000);
  }
  close(): void {
    this.isSubmitted = false;
  }
}
