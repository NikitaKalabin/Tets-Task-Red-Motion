import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { SplashScreen } from '@capacitor/splash-screen';

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

  constructor(private dataService: DataService) {
  }
  async ngOnInit(): Promise<void> {
    await this.dataService.initializePlugin();
    this.loadDigits();
  }

  enableInput(): void {
    this.isInputEnabled = true;
  }

  async saveDigit(): Promise<void> {
    if (this.digit) {
      await this.dataService.saveDigit(this.digit);
      this.savedDigit = this.digit;
      this.isDigitStored = true;
      this.isInputEnabled = false;
      console.log('Digit saved:', this.digit);
    } else {
      console.log('No digit to save');
    }
  }

  changeDigit(): void {
    this.isInputEnabled = true;
  }

  private async loadDigits(): Promise<void> {

    const digits = await this.dataService.getDigits();
    console.log('Loaded digits:', digits);
    if (digits.length > 0) {
      this.savedDigit = digits[0];
      this.isDigitStored = true;
      console.log('Loaded digits:', digits);
    } else {
      console.log('No digits found');
    }
  }
}