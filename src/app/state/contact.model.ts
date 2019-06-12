import { ID } from '@datorama/akita';

export interface Contact {
  id: ID;
}

/**
 * A factory function that creates Contacts
 */
export function createContact(params: Partial<Contact>) {
  return {

  } as Contact;
}
