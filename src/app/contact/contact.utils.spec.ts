import { eStatus, IContact } from './contact-list/contact.model';
import { filterContacts } from './contact.utils';

describe('Contact Utils', () => {
  const contactsList: IContact[] = [
    {
      email: 'test@email.com',
      company: 'Company 1',
      firstName: 'John',
      familyName: 'Doe',
      age: 25,
      monthlyIncome: 5000,
      status: eStatus.Married,
      numberOfChildren: 0,
    },
    {
      email: 'mike@email.com',
      company: 'HI 1',
      firstName: 'Mike',
      familyName: 'Deker',
      age: 45,
      monthlyIncome: 55000,
      status: eStatus.Single,
      numberOfChildren: 0,
    },
    {
      email: 'j.abarrah@email.com',
      company: 'YAAY 1',
      firstName: 'Jaouad',
      familyName: 'Abarrah',
      age: 28,
      monthlyIncome: 55000,
      status: eStatus.Married,
      numberOfChildren: 1,
    },
  ];
  describe('filterContacts', () => {
    it('should return empty array if contact does not exist', () => {
      const search = 'invalidEntry';
      const result = filterContacts(contactsList, search);
      expect(result).toEqual([]);
      expect(result.length).toEqual(0);
    });

    it('should return 1 item in array if first name exists', () => {
      const search = 'jaouad';
      const result = filterContacts(contactsList, search);
      expect(result[0]).toEqual(contactsList[2]);
      expect(result[0].firstName.toLowerCase()).toContain(search);
    });

    it('should return 1 item in array if family name exists', () => {
      const search = 'abarrah';
      const result = filterContacts(contactsList, search);
      expect(result[0]).toEqual(contactsList[2]);
      expect(result[0].familyName.toLowerCase()).toContain(search);
    });

    it('should return 1 item in array if email exists', () => {
      const search = 'j.abarrah';
      const result = filterContacts(contactsList, search);
      expect(result[0]).toEqual(contactsList[2]);
      expect(result[0].email.toLowerCase()).toContain(search);
    });

    it('should return empty array if company does not exist', () => {
      const search = 'yaa';
      const result = filterContacts(contactsList, search);
      expect(result[0]).toEqual(contactsList[2]);
      expect(result[0].company.toLowerCase()).toContain(search);
    });
  });
});
