import { Component, OnDestroy, OnInit } from '@angular/core';
import { IContact } from './contact.model';
import { ContactService } from '../contact.service';
import { FormControl } from '@angular/forms';
import { map, startWith, Subscription } from 'rxjs';
import { filterContacts } from '../contact.utils';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: IContact[] = [];
  ALLCONTACTS: IContact[] = [];
  filteredContacts: IContact[] = [];
  filter = new FormControl('');
  subscriptions = new Subscription();
  columnsList = [
    { name: 'Full Name', selected: true },
    { name: 'Email', selected: true },
    { name: 'Company', selected: true },
    { name: 'Age', selected: true },
    { name: 'Status', selected: true },
    { name: 'Monthly Income', selected: true },
  ];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  constructor(private contactsService: ContactService) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((data) => {
      this.ALLCONTACTS = this.contacts = data;
      this.filteredContacts = data.slice(0, this.pageSize);
      this.collectionSize = this.contacts.length;
    });
    this.subscriptions.add(
      this.filter.valueChanges
        .pipe(
          startWith(''),
          map((text) => filterContacts(this.ALLCONTACTS, text))
        )
        .subscribe((data) => {
          this.contacts = data;
          this.filteredContacts = data.slice(0, this.pageSize);
          this.collectionSize = data.length;
        })
    );
  }
  refreshContacts() {
    this.filteredContacts = this.contacts
      .map((contact, i) => ({ id: i + 1, ...contact }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  canShow(label: string): boolean {
    const line = this.columnsList.filter((col) => col.name === label)[0];
    return line.selected;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
