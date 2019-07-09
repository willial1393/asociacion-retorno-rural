import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppGlobal {
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'api-key': 'base64:J68Ud9AJhPEPLoBGL1pRrVM7TJoHZPP+wM1UlMqonSY='
    });
}
