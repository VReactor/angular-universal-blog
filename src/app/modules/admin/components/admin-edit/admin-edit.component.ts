import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IPost } from 'app/modules/app-common/models/interfaces';
import { PostService } from 'app/modules/app-common/services';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-admin-edit',
    templateUrl: './admin-edit.component.html',
    styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
    post: IPost = undefined;
    form: FormGroup = new FormGroup({
        title: new FormControl(undefined, Validators.required),
        text: new FormControl(undefined, Validators.required)
    });

    constructor(
        private postService: PostService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params
            .pipe(
                switchMap((params: Params) =>
                    this.postService.getPost(params.id)
                )
            )
            .subscribe((post: IPost) => {
                this.post = post;
                this.form.setValue({
                    title: post.title,
                    text: post.text
                });
            });
    }

    edit() {
        if (this.form.invalid) {
            return;
        }

        this.postService
            .update({
                ...this.post,
                title: this.form.value.title,
                text: this.form.value.text
            })
            .subscribe(() => {
                this.router.navigate(['/admin', 'dashboard']);
            });
    }
}