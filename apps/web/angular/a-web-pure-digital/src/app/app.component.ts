import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionService } from '@pure-workspace/feature-angular';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private session = inject(SessionService);
  title = 'Pure Digital';

  constructor() {
    this.session.updateSession({
      loggedAppId: '1',
    });
  }
}
