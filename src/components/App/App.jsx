import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, SubTitle, Wrapper } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '369-10-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Rostyslav Dovhan', number: '337-81-15' },
      { id: 'id-5', name: 'Myroslava Mazuryk', number: '332-91-11' },
    ],
    filter: '',
  };

  // Збереження контактів в localStorage
  componentDidMount() {
    const contacts = localStorage.getItem('contacts'); // Отримання даних з localStorage.
    const parsedContacts = JSON.parse(contacts); // Перетворення даних з JSON в об'єкт JavaScript.

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts }); // Встановлюємо отримання контактів в об'єкт "contacts".
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      // Порівняння контакітв з попереднім об'єктои контактів
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      // Якщо контакт змінився зберігаємо їх в localStorage.
    }
  }

  // добавляємо новий контакт в список контактів
  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) =>
        name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );
    // Якщо контакт уже є, то виводимо повідомлення
    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  // Зміна значення фільтра
  changeFilter = event => {
    this.setState({ filter: event.target.value.trim() });
  };

  // Отримуємо відфільтровані контакти
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Видаляємо контакти із списку
  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;

    return (
      <Container>
        <Title>Phonebook</Title>

        <ContactForm onSubmit={this.addContact} />

        <SubTitle>Contacts</SubTitle>
        {this.state.contacts.length > 0 ? (
          // Фільтр для відображення контактів
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        ) : (
          <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
        )}
        {this.state.contacts.length > 0 && (
          // Список контактів
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </Container>
    );
  }
}

export default App;
