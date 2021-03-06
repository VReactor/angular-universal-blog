import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPost } from 'app/models';
import { PostService } from 'app/services';

@Component({
    selector: 'app-admin-create',
    templateUrl: './admin-create.component.html'
})
export class AdminCreateComponent {
    form: FormGroup = new FormGroup({
        title: new FormControl(undefined, Validators.required),
        author: new FormControl(undefined, Validators.required),
        text: new FormControl(undefined, Validators.required)
    });

    constructor(private postService: PostService, private router: Router) {}

    create() {
        if (this.form.invalid) {
            return;
        }

        const post: IPost = {
            title: this.form.value.title,
            author: this.form.value.author,
            text: this.form.value.text,
            date: new Date()
        };

        this.postService.create(post).subscribe((res: IPost) => {
            this.router.navigate(['/admin', 'dashboard']);
        });
    }
}
