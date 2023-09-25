import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private renderer: Renderer2;
  private messageElement: HTMLElement;

  messageColorByType = {
    'success': '#66bb6a',
    'error': '#ef7da0',
    'info': '#00bfff'
  }

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  showMessage(type: 'success'| 'error' | 'info', message: string) {
    this.messageElement = this.renderer.createElement('div');
    this.messageElement.textContent = message;
    this.renderer.addClass(this.messageElement, 'message');
    this.renderer.setStyle(this.messageElement, 'position', 'fixed');
    this.renderer.setStyle(this.messageElement, 'top', '20px');
    this.renderer.setStyle(this.messageElement, 'right', '20px');
    this.renderer.setStyle(this.messageElement, 'background-color', this.messageColorByType[type]);
    this.renderer.setStyle(this.messageElement, 'color', 'white');
    this.renderer.setStyle(this.messageElement, 'padding', '20px 30px');
    this.renderer.setStyle(this.messageElement, 'border-radius', '6px');
    this.renderer.setStyle(this.messageElement, 'box-shadow', '0px 10px 15px #4CAF505C');
    document.body.appendChild(this.messageElement);

    setTimeout(() => {
      this.hideSuccessMessage();
    }, 3000);
  }

  private hideSuccessMessage() {
    if (this.messageElement && this.messageElement.parentNode) {
      this.renderer.removeChild(document.body, this.messageElement);
    }
  }
}
