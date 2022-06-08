import { IContact } from './contact-list/contact.model';

export function filterContacts(contacts: IContact[], text: string) {
  return contacts.filter((contact) => {
    const term = text.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(term) ||
      contact.familyName.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.company.toLowerCase().includes(term)
    );
  });
}
