import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import { merge, Observable, of, Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

@Directive({
    selector: '[invalidMessage]'
})
export class InvalidMessageDirective implements OnInit, OnDestroy {

    @Input() invalidMessage: string;
    @Input() groupName?: string;

    control: AbstractControl;
    control$: Observable<any>;
    controlSubscription: Subscription;

    constructor(
        private controlContainer: ControlContainer,
        private elementRef: ElementRef,
        private render: Renderer2
    ) {}

    ngOnInit(): void {
        this.control$ = of(this.form.get(this.invalidMessage.toString())).pipe(
            filter((control: AbstractControl) => !!control),
            take(1),
            switchMap((control: AbstractControl) => {
                this.control = control;

                return merge(this.control.valueChanges, this.control.statusChanges, of(''));
            }));

        this.controlSubscription = this.control$
            .subscribe(() => {
                this.setVisible();
            });
    }

    private setVisible() {
        let check = this.control.invalid && (this.control.dirty || this.control.touched);

        if (check) {
            this.render.removeStyle(this.elementRef.nativeElement, 'display');
        } else {
            this.render.setStyle(this.elementRef.nativeElement, 'display', 'none');
        }
    }

    match(error: string): boolean {
        return this.control && this.control.errors && Object.keys(this.control.errors).indexOf(error) > -1;
    }

    getError(error: string) {
        return this.control.errors[error];
    }

    get form() {
        const formGroup = this.controlContainer.formDirective ? (this.controlContainer.formDirective as FormGroupDirective).form : null;

        return this.groupName ? formGroup.controls[this.groupName] : formGroup;
    }

    ngOnDestroy() {
        if (this.controlSubscription) {
            this.controlSubscription.unsubscribe();
        }
    }
}
