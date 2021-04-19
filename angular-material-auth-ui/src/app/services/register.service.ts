import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/register';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = 'http://localhost:3333/users'; // api rest

   // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

 // Headers
 httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

//obtem todos os registros

getRegister(): Observable<Register> {
  return this.httpClient.get<Register>(this.url)
  .pipe(
    retry(2),
    catchError(this.handleError))

}

// salva um registro
saveRegister(registro: Register): Observable<Register> {
  return this.httpClient.post<Register>(this.url, JSON.stringify(registro), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}


// utualiza um registro
updateRegistro(registro: Register): Observable<Register> {
  return this.httpClient.put<Register>(this.url + '/' +registro.id, JSON.stringify(registro), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
}


  // deleta um registro
  deleteRegistro(registro: Register) {
    return this.httpClient.delete<Register>(this.url + '/' + registro.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
}


// Manipulação de erros
handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Erro ocorreu no lado do client
    errorMessage = error.error.message;
  } else {
    // Erro ocorreu no lado do servidor
    errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
};




}
