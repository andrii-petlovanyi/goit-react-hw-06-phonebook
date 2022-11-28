import PropTypes from 'prop-types';
import { useState } from 'react';
import { ContactsForm, Label, Input, Button } from './ContactsForm.styled';
import { nanoid } from 'nanoid';

export const ContactForm = ({ onSubmit = () => {} }) => {
  const [contact, setContact] = useState({
    name: '',
    number: '',
  });

  const onChange = event => {
    const { name, value } = event.currentTarget;
    setContact(state => ({ ...state, [name]: value }));
  };

  const handlerSubmit = event => {
    event.preventDefault();
    const cont = {
      name: contact.name,
      number: contact.number,
      id: nanoid(),
    };
    onSubmit(cont);
    setContact({ name: '', number: '' });
  };

  return (
    <ContactsForm onSubmit={handlerSubmit}>
      <Label htmlFor="name">
        Name
        <Input
          value={contact.name}
          onChange={onChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label htmlFor="number">
        Number
        <Input
          value={contact.number}
          onChange={onChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="Submit">Add to Contacts</Button>
    </ContactsForm>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
