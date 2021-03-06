import { Component, OnInit } from '@angular/core';
import { CustomerAuthenticationService } from '../_auth/customer-authentication.service';
import { CustomersModelServer } from '../_models/customers';
import { CustomerService } from '../_services/customer.service';
import { SharedService } from '../_services/shared_service/shared.service';
import {TranslateService} from '@ngx-translate/core'
import jwt_decode from "jwt-decode";
import { CartModelPublic } from '../_models/cart';


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  customer: CustomersModelServer;
  fname: any;
  customerData: any;
  cart: any;
  _message: string

  //Data variable to store the cart information on the client's local storage
  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [
      {
        incart: 0,
        id: 0,
      },
    ],
  };
  //languages =[{value:"en",lang:"English"},{value:"fr",lang:"French"}]

  constructor(public translate: TranslateService,public custAuthService: CustomerAuthenticationService, private customerService: CustomerService) { 
    translate.addLangs(['English','French'])
    translate.setDefaultLang('French')
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/English|French/) ? browserLang : 'French');
  }

  ngOnInit(): void {

   
    
    let customerToken = this.custAuthService.getToken()
    var decoded = jwt_decode(customerToken);
    console.log("Decoded token", decoded);
    this.fname = decoded.fname
 }


 customerLogout(){
  console.log("Some item find")
   //check state of shopping cart
this.custAuthService.logout()

  
 }

  

}
