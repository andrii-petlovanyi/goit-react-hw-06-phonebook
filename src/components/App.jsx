import { useState, useEffect } from 'react';
import { Box } from './Box';
import { ContactForm } from './ContactsForm/ContactsForm';
import { FilterContacts } from './Filter/Filter';
import { ContactList } from './ContactsList/ContactsList';
import { theme } from './Theme';

const KEY_CONTACTS = 'contacts_database';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsFromLS = JSON.parse(localStorage.getItem(KEY_CONTACTS));
    return contactsFromLS ? contactsFromLS : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(KEY_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    if (
      contacts.find(
        cont => cont.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      return alert(`${contact.name} is already in contacts`);
    }
    setContacts(prevState => [...prevState, contact]);
  };

  const onDelete = id => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const onChange = event => {
    setFilter(event.currentTarget.value);
  };

  const onFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Box
      as="section"
      width={380}
      listStyle="none"
      mx="auto"
      mt="20px"
      p="20px"
      borderRadius="20px"
      backgroundColor={theme.colors.mainBackground}
      boxShadow={theme.shadows.custom}
    >
      <Box
        as="h1"
        display="flex"
        justifyContent="center"
        color={theme.colors.text}
        fontFamily={theme.fonts.title}
      >
        PhoneBook
      </Box>
      <ContactForm onSubmit={addContact} />
      <Box
        as="span"
        width={330}
        height={3}
        backgroundColor={theme.colors.text}
        display="flex"
        mx="auto"
        my="40"
      />
      <Box
        as="h2"
        my={40}
        display="flex"
        color={theme.colors.text}
        fontFamily={theme.fonts.title}
        justifyContent="center"
      >
        {contacts.length > 0 ? 'Contacts' : 'No contacts'}
      </Box>
      {contacts.length > 1 && (
        <FilterContacts onChange={onChange} value={filter} />
      )}
      <ContactList contacts={onFilter()} onDelete={onDelete} />
    </Box>
  );
};
