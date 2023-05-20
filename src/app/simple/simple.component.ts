import { Expression } from '@angular/compiler';
import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css'],
})
export class SimpleComponent {
  login: Login = new Login();

  submitForm(form: NgForm) {
    console.log('表单验证:' + form.valid);
  }

  //一个表单字段NgModel的验证方法
  //ngModel参见:https://angular.io/api/forms/NgModel
  //model.error : ValidationError

  getModelErrors(model: NgModel) {
    let errors: string[] = [];

    let key = model.path[0];
    for (const err in model.errors) {
      switch (err) {
        case 'min':
          errors.push(`字段${key}的最小值为:${model.errors['min'].min}`);
          break;
        case 'max':
          errors.push(`字段${key}的最大值为:${model.errors['max'].max}`);
          break;
        case 'required':
          errors.push(`字段${key}是必填项`);
          break;
        case 'email':
          errors.push(`字段${key}不符合Email规范`);
          break;
        case 'minlength':
          errors.push(
            `字段${key}的最小长度为:${model.errors['minlength'].requiredLength}`
          );
          break;
        case 'maxlength':
          errors.push(
            `字段${key}的最小长度为:${model.errors['maxlength'].requiredLength}`
          );
          break;
        case 'pattern':
          errors.push(
            `字段${key}的输入规范需满足正则:${model.errors['pattern'].requiredPattern}`
          );
          break;
        default:
          errors.push(`出现未捕捉错误:${err}`);
          break;
      }
    }

    return errors;
  }
}

export class Login {
  constructor(public userName?: string, public password?: string) {}
}
