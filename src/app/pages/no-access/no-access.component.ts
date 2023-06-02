import {Component} from '@angular/core';
import {AppAuthService} from '../../service/app.auth.service';
import {HeaderService} from '../../service/header.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class NoAccessComponent {

  constructor(private authService: AppAuthService, private headerService: HeaderService, public oauthService: OAuthService) {
    this.headerService.setPage('nav.noaccess');
  }

  public login() {
    this.authService.login();
  }

}
