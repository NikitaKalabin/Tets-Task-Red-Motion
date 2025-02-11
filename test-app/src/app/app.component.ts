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
  digit: string = '';         // input value
  savedDigit: string = '';    // stored digit from database for display
  isInputEnabled: boolean = false;
  isDigitStored: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getItems((err, rows) => {
      if (err) {
        console.error('Failed to fetch digit from database', err);
        return;
      }
      if (rows.length > 0) {
        this.savedDigit = rows[0].name;
        this.isDigitStored = true;
      }
    });
  }

  enableInput(): void {
    this.isInputEnabled = true;
  }

  saveDigit(): void {
    if (this.digit) {
      this.dataService.addItem(this.digit, (err) => {
        if (err) {
          console.error('Failed to save digit to database', err);
          return;
        }
        this.savedDigit = this.digit;
        this.isDigitStored = true;
        this.isInputEnabled = false;
      });
    }
  }

  changeDigit(): void {
    this.isInputEnabled = true;
  }
}