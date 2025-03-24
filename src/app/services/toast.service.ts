import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastBox!: HTMLElement;

  private warningIcon = 'bi bi-exclamation-circle-fill';
  private successIcon = 'bi bi-check-circle-fill';
  private errorIcon = 'bi bi-x-circle-fill';
  private infoIcon = 'bi bi-info-circle-fill';

  private defaultDuration = 5000;

  constructor() {
    this.initToastContainer();
  }

  private initToastContainer() {
    if (!this.toastBox) {
      this.toastBox = document.createElement('div');
      this.toastBox.classList.add('toastify', 'toastBox');
      document.body.appendChild(this.toastBox);
    }
  }

  private showToast(message: string, type: string, iconClass: string, duration: number) {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerHTML = `<i class="${iconClass}"></i> ${message}`;

    const closeBtn = document.createElement('i');
    closeBtn.classList.add('bi', 'bi-x', 'closeBtn');

    const hideToast = () => {
      toast.classList.add('hide');
      setTimeout(() => {
        toast.classList.add('shrink');
        setTimeout(() => {
          toast.remove();
        }, 200);
      }, 500);
    };

    closeBtn.addEventListener('click', hideToast);
    toast.addEventListener('click', hideToast);
    toast.appendChild(closeBtn);
    this.toastBox.appendChild(toast);

    /*
      Start Hover stop timer Logic
    */
    let timeoutId: any;
    let timeLeft = duration;
    let startTime: number;

    const startTimer = () => {
      startTime = Date.now();
      timeoutId = setTimeout(hideToast, timeLeft);
    };

    const stopTimer = () => {
      clearTimeout(timeoutId);
      const elapsed = Date.now() - startTime;
      timeLeft -= elapsed;
    };

    toast.addEventListener('mouseenter', stopTimer);
    toast.addEventListener('mouseleave', startTimer);

    startTimer();
    /*
      End Hover stop timer Logic
    */
  }

  error(message: string, duration: number = this.defaultDuration) {
    this.showToast(message, 'error', this.errorIcon, duration);
  }

  success(message: string, duration: number = this.defaultDuration) {
    this.showToast(message, 'success', this.successIcon, duration);
  }

  warning(message: string, duration: number = this.defaultDuration) {
    this.showToast(message, 'warning', this.warningIcon, duration);
  }

  info(message: string, duration: number = this.defaultDuration) {
    this.showToast(message, 'info', this.infoIcon, duration);
  }
}
