import { AfterViewInit, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { InvalidMessageDirective } from './invalid-message.directive';

class MinLengthContext {
    constructor(private minLength: number) { }
}

@Directive({
    selector: '[invalidType]'
})
export class InvalidTypeDirective implements AfterViewInit {

    private hasView = false;

    @Input() invalidType: string;

    constructor(
        private invalidMessage: InvalidMessageDirective,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {}

    ngAfterViewInit() {
        this.invalidMessage.control$.subscribe(() => {
            this.setVisible();
        });
    }

    getErrorContext(errorType: string): MinLengthContext {
        const error = this.invalidMessage.getError(errorType);

        if (errorType === 'minlength') {
            return new MinLengthContext(error.requiredLength);
        }
    }

    private setVisible() {
        if (this.invalidMessage.match(this.invalidType)) {
            if (!this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef, this.getErrorContext(this.invalidType));
                this.hasView = true;
            }
        } else {
            if (this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        }
    }
}
