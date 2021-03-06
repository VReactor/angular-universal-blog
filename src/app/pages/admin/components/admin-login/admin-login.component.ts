import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'app/models';
import { AuthService } from 'app/modules/shared';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.less']
})
export class AdminLoginComponent {
    form: FormGroup = new FormGroup({
        email: new FormControl(undefined, [Validators.required, Validators.email]),
        password: new FormControl(undefined, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16)
        ])
    });

    constructor(public authService: AuthService, private router: Router) {}

    login() {
        if (this.form.invalid) {
            return;
        }

        const user: IUser = {
            email: this.form.value.email,
            password: this.form.value.password
        };

        this.authService.login(user).subscribe(() => {
            this.router.navigate(['/admin', 'dashboard']);
        });
    }
}
