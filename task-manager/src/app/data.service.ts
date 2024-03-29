import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  createItem(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tarefas`, item);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tarefas`);
  }

  getItem(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tarefas/${id}`);
  }

  updateItem(id: number, newData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tarefas/${id}`, newData);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tarefas/${id}`);
  }
}
