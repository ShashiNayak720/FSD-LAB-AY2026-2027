import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html'
})
export class App {

  jobForm = new FormGroup({

    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z]+( [A-Za-z]+)*$/)
    ]),

    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10,}$/)
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^@]+@[^@]+$/)
    ])

  });

  onSubmit() {
    if (this.jobForm.valid) {
      alert('Job Application Submitted Successfully!');
      console.log(this.jobForm.value);
    }
  }
}