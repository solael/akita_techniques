import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs';
import {filter} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {snapshotManager} from '@datorama/akita';
import {ContactsQuery} from './state/contacts.query';
import {ContactsService} from './state/contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'akitaTechniques';

  constructor(
    private contactService: ContactsService
  ) {
  }

  ngOnInit(): void {
    fromEvent<StorageEvent>(window, 'storage').pipe(
      filter(event => {
        console.log(event);
        return event.key === 'sync-key';
      }),
      untilDestroyed(this)
    ).subscribe(event => {
      snapshotManager.setStoresSnapshot(event.newValue, { skipStorageUpdate: true});
    });

    this.contactService.add({id: 1});
    this.contactService.add({id: 100});

    this.contactService.remove(100);
  }

  ngOnDestroy(): void {
  }
}
