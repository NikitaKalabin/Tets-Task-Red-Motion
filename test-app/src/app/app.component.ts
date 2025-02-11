import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-app';
  digit: string = '';
  savedDigit: string = '';
  isInputEnabled: boolean = false;
  isDigitStored: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadDigit();
  }

  async loadDigit(): Promise<void> {
    try {
      const rows = await this.dataService.getItems();
      if (rows.length > 0) {
        this.savedDigit = rows[0].name;
        this.isDigitStored = true;
      }
    } catch (err) {
      console.error('Failed to fetch digit from database', err);
    }
  }

  async saveDigit(): Promise<void> {
    if (this.digit) {
      try {
        await this.dataService.addItem(this.digit);
        this.savedDigit = this.digit;
        this.isDigitStored = true;
        this.isInputEnabled = false;
      } catch (err) {
        console.error('Failed to save digit to database', err);
      }
    }
  }

  enableInput(): void {
    this.isInputEnabled = true;
  }

  changeDigit(): void {
    this.isInputEnabled = true;
  }
}