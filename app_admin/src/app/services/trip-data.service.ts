import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  url = 'http://localhost:3000/api';

  public async getTrips(): Promise<Trip[]> {
    return await lastValueFrom(
      this.http.get<Trip[]>(`${this.url}/trips`)
    ).catch(this.handleError);
  }

  public async getTrip(tripCode: string): Promise<Trip[]> {
    return await lastValueFrom(
      this.http
        .get<Trip[]>(`${this.url}/trips/${tripCode}`)
    ).catch(this.handleError);
  }

  public async addTrip(formData: Trip): Promise<Trip> {
    return await lastValueFrom(
      this.http
        .post<Trip[]>(`${this.url}/trips`, formData)
    ).catch(this.handleError);
  }

  public async updateTrip(formData: Trip): Promise<Trip[]> {
    return await lastValueFrom(
      this.http.put<Trip[]>(`${this.url}/trips/${formData.code}`, formData)
    ).catch(this.handleError);
  }

  public async deleteTrip(tripCode: string): Promise<Trip[]> {
    return await lastValueFrom(
      this.http.delete<Trip[]>(`${this.url}/trips/${tripCode}`)
    ).catch(this.handleError);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private async makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    return await lastValueFrom(
      this.http.post<AuthResponse>(`${this.url}/${urlPath}`, user)
    ).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
