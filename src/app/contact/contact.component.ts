import { Feedback, ContactType } from './../shared/feedback';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  feedbackForm:FormGroup;
  feedback:Feedback;
  contactType=ContactType;

  @ViewChild('fform', {static: false}) feedbackFormDirective;
  formErrors = {
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':'',
    'message':'',
  };
  validationMessages = {
    'firstname':{
      'required':'First name is required',
      'minlength':'First name must be at least 2 characters long',
      'maxlength':'First name cannot be more than 25 characters long',
    },
    'lastname':{
      'required':'Last name is required',
      'minlength':'Last name must be at least 2 characters long',
      'maxlength':'Last name cannot be more than 25 characters long',
    },
    'telnum':{
      'required':'Telephone number is required',
      'pattern':'Tel.num must contain only numbers'
    },
    'email':{
      'required':'Email is required',
      'email':'Email is not in valid format'
    },
    'message':{
      'required':'Message is required',
      'minlength':'Message must be at least 2 characters long',
      'maxlength':'Message cannot be more than 25 characters long',
    }
  };
  onValueChanged(data?:any){
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  constructor(private fb:FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum:[0, [Validators.required, Validators.pattern]],
      email:['', [Validators.required, Validators.email, Validators.minLength(2), Validators.maxLength(25)]],
      agree:false,
      contacttype:'None',
      message:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
    });
    this.feedbackForm.valueChanges.subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();//(re)set form validation messages
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      agree:false,
      contacttype:'None',
      message:'',
    });
    this.feedbackFormDirective.reset();
  }

}
