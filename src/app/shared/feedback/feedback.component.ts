import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  buttonText = 'पठाउनु होस्';
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [
    Validators.pattern('[0-9०१२३४५६७८९]*'),
    Validators.minLength(10),
    Validators.maxLength(10)
  ]);
  name = new FormControl('', [Validators.required]);
  // ,Validators.pattern('[a-zA-Zक- ]*')
  message = new FormControl('', [Validators.required]);

  getPhoneErrorText() {
    return this.phone.hasError('pattern')
      ? 'यो फोन नम्वर अमान्य छ !'
      : this.phone.hasError('maxLength')
        ? 'यो फोन नम्वर अमान्य छ !-'
        : this.phone.hasError('minLength')
          ? 'यो फोन नम्वर अमान्य छ !+'
          : '';
  }
  getEmailErrorText() {
    return this.email.hasError('required')
      ? 'यो क्षेत्र अनिवार्य छ !'
      : this.email.hasError('email')
        ? 'यो इमेल अमान्य छ !'
        : '';
  }
  getNameErrorText() {
    return this.name.hasError('required') ? 'यो क्षेत्र अनिवार्य छ !' : '';
    // : this.name.hasError('pattern')
    // ? 'यो नाम अमान्य छ !'
  }
  getMessageErrorText() {
    return this.message.hasError('required') ? 'यो क्षेत्र अनिवार्य छ !' : '';
  }
  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {}
  submitForm() {
    const data = {
      fullName: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      message: this.message.value
    };
    this.feedbackService.create(data);
    this.buttonText = '‍‍‍‍‍‍...';
    this.clearForm();
    setTimeout(() => (this.buttonText = 'पठाउनु होस'), 3000);
  }
  clearForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phone = new FormControl('');
    this.name = new FormControl('', [Validators.required]);
    // ,Validators.pattern('[a-zA-Zक- ]*')
    this.message = new FormControl('', [Validators.required]);
  }
}
