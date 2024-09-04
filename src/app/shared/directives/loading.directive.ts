import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';

@Directive({
  standalone: true,
  selector: '[apploading]',
})
export class LoadingDirective {
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly vcRef = inject(ViewContainerRef);

  loaderComponent!: ComponentRef<LoaderComponent>;

  @Input()
  set apploading(loading: boolean) {
    this.vcRef.clear();
    if (loading) {
      this.vcRef.createComponent(LoaderComponent);
    } else {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }
}
