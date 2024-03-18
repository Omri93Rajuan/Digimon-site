import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Digimon} from '../digimon';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DigimonService {
  private digimons: Array<Digimon> = [];
  private digimonsUpdated = new Subject<Digimon[]>();

  constructor(private http: HttpClient,private router: Router) { }

  getAllDigimon(): Observable<Digimon[]> {
    return this.http.get<Digimon[]>(
      "http://localhost:8181/data"
    );
  }
  
  getDigimonByName(name: string) {
    return this.http.get(`https://digimon-api.vercel.app/api/digimon/name/${name}`);
  }

  addPost(digimonData:Digimon) {
    const digimon: Digimon = digimonData;
    digimon.id = Math.floor(Math.random() * 1000000); // יצירת ID אקראי
    this.http.post(
      "http://localhost:8181/data",
      digimon
    )
    .subscribe({
      next: () => {
        // ... טיפול בהצלחה
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 201) {
          // ... המשך ביצוע פעולות
        } else {
          console.error('שגיאה בשרת:', error);
          // ... הצגת הודעת שגיאה למשתמש
        }
      }
    });
    
  }
  deletePost(id:number){
    this.http.delete(
        `http://localhost:8181/data/${id}`
    )
    .subscribe({
      next: () => {
        // ... טיפול בהצלחה
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 201) {
          // ... המשך ביצוע פעולות
        } else {
          console.error('שגיאה בשרת:', error);
          // ... הצגת הודעת שגיאה למשתמש
        }
      }
    });
  }
}
