import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-app';
  digit: string = '';         // input value
  savedDigit: string = '';    // stored digit from cookie for display
  isInputEnabled: boolean = false;
  isDigitStored: boolean = false;

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      const storedDigit = this.getCookie('storedDigit');
      if (storedDigit) {
        this.savedDigit = storedDigit;
        this.isDigitStored = true;
      }
    }
  }

  enableInput(): void {
    this.isInputEnabled = true;
  }

  saveDigit(): void {
    if (this.digit && typeof document !== 'undefined') {
      document.cookie = `storedDigit=${this.digit}; path=/;`;
      this.savedDigit = this.digit;
      this.isDigitStored = true;
      this.isInputEnabled = false;
    }
  }

  changeDigit(): void {
    this.isInputEnabled = true;
  }

  private getCookie(name: string): string | undefined {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}