# MovieHubAPI
Studenci:
Adam Niemiec,
Michał Skwara,
Mikołaj Bul,
Łukasz Stachoń,

Zarys projektu
Głównym założeniem projektu jest stworzenie aplikacji opartej na bazie filmów i osób kina.
Dodatkowymi możliwościami będą ocenianie, wystawianie recenzji oraz przeglądanie najnowszych wiadomości ze świata kinematografii. Każdy użytkownik aplikacji będzie mógł sprawdzać swoje indywidualne recenzje i rekomendacje, komunikować się z innymi odbiorcami poprzez wysyłanie wiadomości oraz przeglądać aktualności dotyczące wybranych przez niego filmów/aktorów/nagród itp.

W projekcie planujemy wykorzystać technologie MongoDB oraz Node.js.

Instalacja:
1. Otwórz konsolę i sprawdź wywołaj: node --version. Jeżeli zostanie wypisana wersja zainstalowanego node, nie musisz go instalować - przejdź do kroku 3.
2. Zainstaluj node - https://nodejs.org/en/download/
3. Otwórz folder projektu.
4. W konsoli wywołaj: npm install
5. Następnie w konsoli wywołaj: npm start
6. W tym momencie serwer łączy się z bazą danych i oczekuje na zapytania.

Używanie:
1. Pobierz Postmana do wysyłania requestów - https://www.postman.com/downloads/
2. Po lewej stronie w Postmanie naciśniej przycisk: Import
3. W okienku wybierz plik requesty.json załączony w katalogu głównym projektu.
4. Naciśnij przycisk Import.
5. Po lewej stronie powinny być dostępne wszystkie requesty, które można teraz w prosty sposób wywołać.
  a) Wybierz jeden z requestów
  b) W niektórych requestach metodą POST, PATCH występuje sekcja Body dostępna pod adresem requesta. Można tam zmienić przesyłane dane dotyczące danego requesta.
  c) Kliknij niebieski przycisk Send.
