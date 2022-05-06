import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

export class ErrorHandler {
    public static handleException(request,message,error){
        var msg = "";
        msg += "Code:" + request.status + "\n";
        msg += "Text:" + request.statusText + "\n";
        if(request.responseJSON != null){
            msg += "Message:" + request.responseJSON.Message + "\n";
        }
        console.log(msg);
    }
}