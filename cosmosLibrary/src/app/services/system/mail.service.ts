import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralService } from './general.service';

var Email={
  createCORSRequest:function (e, n) { 
    var t = new XMLHttpRequest; 
    return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XMLHttpRequest ? (t = new XMLHttpRequest).open(e, n) : t = null, t 
  }, 
  ajax: function (e, n) { 
    var t = Email.createCORSRequest("GET", e); 
    t.onload = function () { 
      var e = t.responseText; 
      null != n && n(e) 
    }, t.send() 
  }, 
  ajaxPost:function (e, n, t) { 
    var a = Email.createCORSRequest("POST", e); 
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { 
      var e = a.responseText; 
      null != t && t(e) 
    }, a.send(n) 
  }, 
  send:function (a) { 
    return new Promise(function (n, e) { 
      a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; 
      var t = JSON.stringify(a); 
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { 
        n(e) 
      }) 
    }) 
  }
};

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private mailOptions:any;
  private info:any;
  private transporter:any;

  emailSender:any;

  constructor(
    private _generalService:GeneralService
  ) { 
    this.emailSender = Email;
  }  

  sendEmail(data:any){
    let {email, code, name} = data;
    this.emailSender.send({
      SecureToken :"de7ededd-ec4d-48de-91e9-12bb004a6d87",
      To : email,
      From : "Cosmos Library <labsoftware.cosmoslibrary@gmail.com>",
      Subject : "Recuperación de Contraseña",
      Body : `Cordial saludo ${name}, esta es tu nueva contraseña:
      \n<strong>${code}</strong>,\n 
      accede a <a href=${environment.url}>Cosmos Library</a> para cambiarla.`
  }).then(message => {
      if(message === 'OK'){
        this._generalService.openSnackBar({message:'Se ha enviado una nueva contraseña a tu correo electrónico.'});
      }
    })
    .catch(err => {
      this._generalService.openSnackBar({message:'Ha ocurrido un error al recuperar la contraseña.'});
    })
  }
  
}
