import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, SubTitle, Wrapper } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const phoneContacts = [
      { id: 'id-1', name: 'Rosie Simpson', number: '369-10-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Rostyslav Dovhan', number: '337-81-15' },
      { id: 'id-5', name: 'Myroslava Mazuryk', number: '332-91-11' },
];
    
const App = () => {
  // Значення  із локального сховища браузера з ключем "contacts"
  const [contacts, setContacts] = useState(() => {
    // Якщо значення не знайдено встановлюється значення масива
    return JSON.parse(window.localStorage.getItem('contacts')) ?? phoneContacts;
  });

  const [filter, setFilter] = useState('');

  // Збереження контактів в локальне сховище браузера з ключем "contacts". Спрацьовує при зміні стану contacts
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  // добавляємо новий контакт в список контактів
  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) =>
        name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );

    // Якщо контакт уже є, то виводимо повідомлення. Перевіряємо чи існує контакт з таким іменем в списку контактів
    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...contact },
    ]);
  };



  // Зміна значення фільтра
  const changeFilter = event => {
    setFilter(event.target.value.trim());
  };

  // Отримуємо відфільтровані контакти
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Видаляємо контакти із списку
  const removeContact = contactId => {
    setContacts(prevContacts =>
     prevContacts.filter(contact => contact.id !== contactId),
      );
  };

  const visibleContacts = getVisibleContacts();


    return (
      <Container>
        <Title>Phonebook</Title>

        <ContactForm onSubmit={addContact} />

        <SubTitle>Contacts</SubTitle>
        {contacts.length > 0 ? (
          // Фільтр для відображення контактів
          <Filter value={filter} onChangeFilter={changeFilter} />
        ) : (
          <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
        )}
        {contacts.length > 0 && (
          // Список контактів
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={removeContact}
          />
        )}
      </Container>
    );
  }

export default App;
