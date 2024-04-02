import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Digimon} from '../digimon';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';


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
  getDigimonById(id:any): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8181/data/${id}`
      );
  }
  
  
  getDigimonByName(name: string) {
    return this.http.get(`https://digimon-api.vercel.app/api/digimon/name/${name}`);
  }

  addPost(digimonData:any) {
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

  async editPost(id: number, postData: Digimon): Promise<void> {
    try {
      const response$ = this.http.patch<Digimon>(
        `http://localhost:8181/data/${id}`,
        postData
      ).pipe(
        // טיפול בתגובה מוצלחת
        tap(response => {
          console.log('פוסט עודכן בהצלחה:', response);
          // ... לוגיקה נוספת להצלחה
        }),
        // טיפול בשגיאות
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 201) {
              // ... טיפול במקרה ספציפי של 201
            } else {
              console.error('שגיאה מהשרת:', error.message);
              // ... הצגת הודעת שגיאה ידידותית למשתמש
            }
          } else {
            console.error('שגיאה בלתי צפויה:', error);
          }
          return throwError(error); // זריקת השגיאה שוב לטיפול נוסף
        })
      );
  
      // אין צורך ב-toPromise() יותר
      await response$.subscribe();
  
    } catch (error) {
      console.error('שגיאה כללית במהלך עריכה:', error);
      // ... טיפול בשגיאות כלליות כאן
    }
  }
}
