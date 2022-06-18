import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CustomHeaderInterceptor implements HttpInterceptor {
    readonly authService = "https://localhost:7007/api/Auth/authenticate";
    token:any;
    constructor(private http: HttpClient) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const userInfo = {
            "name": "user1",
            "password": "password1"
        }
        const promise = this.http.post<any>(this.authService, userInfo).toPromise();
        promise.then(data => {
            if (data) {
                localStorage.setItem('currentUser', JSON.stringify({ token: data.token }));
            }
        });

        this.token = localStorage.getItem('currentUser')?.toString();
        let i = JSON.parse(this.token);
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${i.token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        request = request.clone({ headers });
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    console.log("Test");
                }
                return throwError(err);
            })
        );
    }
}