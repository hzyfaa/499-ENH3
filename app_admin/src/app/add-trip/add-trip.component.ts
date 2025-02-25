import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../services/trip-data.service';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-add-trip',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  public onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value).then((data) => {
        this.router.navigate(['']);
      });
    }
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}
