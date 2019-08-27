import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
//  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {
};
  registerForm: FormGroup;


  constructor(private authService: AuthService, private alertify: AlertifyService,
  private fb: FormBuilder) { }

  ngOnInit() {
 /* this is manual way of building reactive forms
  this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator); */
    this.createRegisterForm();
  }

  createRegisterForm() {
    // tslint:disable-next-line:comment-format
    //** using formbuilder service to quickly build forms */
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch' : true};
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registration successful');
    }, error => {
      this.alertify.error(error);
      console.log();
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
