# MovieHubAPI
Studenci:
Adam Niemiec,
Michał Skwara,
Mikołaj Bul,
Łukasz Stachoń,

Zarys projektu
Głównym założeniem projektu jest stworzenie aplikacji opartej na bazie filmów i osób kina. Dodatkowymi możliwościami będą ocenianie, wystawianie recenzji oraz przeglądanie najnowszych wiadomości ze świata kinematografii. Każdy użytkownik aplikacji będzie mógł sprawdzać swoje indywidualne recenzje, komunikować się z innymi odbiorcami poprzez zostawianie komentarzy dotyczących konkretnych filmów oraz przeglądać aktualności dotyczące filmów/aktorów/nagród itp.

W projekcie planujemy wykorzystać technologie MongoDB oraz Node.js.

W celu przejrzenia dokumentacji projektu należy otworzyć plik dokumentacja.pdf

Instalacja:
1. Otwórz konsolę i sprawdź wywołaj: node --version. Jeżeli zostanie wypisana wersja zainstalowanego node, nie musisz go instalować - przejdź do kroku 3.
2. Zainstaluj node - https://nodejs.org/en/download/
3. Otwórz folder projektu.
4. W konsoli wywołaj: npm install
5. Aby wygenerować dane wpisz w konsoli: npm run generate
6. Następnie w konsoli wywołaj: npm start
7. W tym momencie serwer łączy się z bazą danych i oczekuje na zapytania.

Używanie:
1. Pobierz Postmana do wysyłania requestów - https://www.postman.com/downloads/
2. Po lewej stronie w Postmanie naciśniej przycisk: Import
3. W okienku wybierz plik requesty.json załączony w katalogu głównym projektu.
4. Naciśnij przycisk Import.
5. Aby zapamiętywanie bycia zalogowanym działało poprawnie musisz stworzyć Environment w Postmanie. Wybierz ikonkę oka po prawej stronie i naciśnij przycisk Add:
![obraz](https://user-images.githubusercontent.com/30327956/121781845-f461ec80-cba6-11eb-9c12-47e573608b25.png)
6. Wybierz jakąkolwiek nazwę dla środowiska oraz wyznacz zmienną o nazwie jwt:
![obraz](https://user-images.githubusercontent.com/30327956/121781900-312de380-cba7-11eb-8bfb-b89a5ffea037.png)
7. Wybierz stworzone środowisko z rozwijanego panelu:
![obraz](https://user-images.githubusercontent.com/30327956/121781914-4c005800-cba7-11eb-9115-cb106eb5d611.png)

8. Po lewej stronie powinny być dostępne wszystkie requesty, które można teraz w prosty sposób wywołać.<br>
  a) Niektóre z nich wymagają bycia zalogowanym - najpierw wyślij requesta umieszczonego w Users -> Login, podając w body<br>
        username: test,<br>
        password: test<br>
     Dzięki temu jesteś teraz zalogowany na konto administratora. Można również wykorzystać request Users -> Signup do utworzenia własnego konta (zwykły użytkownik).<br>
  b) Wybierz jeden z requestów<br>
  c) W niektórych requestach metodą POST, PATCH występuje sekcja Body dostępna pod adresem requesta. Można tam zmienić przesyłane dane dotyczące danego requesta.<br>
  d) Kliknij niebieski przycisk Send.<br>
  
  
Interfejs Postmana:
![obraz](https://user-images.githubusercontent.com/30327956/121781011-2a9d6d00-cba3-11eb-8783-ce81997926e8.png)

Aby uwzględnić bycie zalogowanym, w requeście ustaw następujące wartości (po zaimportowaniu naszego pliku requests.json nie powinno być takiej potrzeby):
![obraz](https://user-images.githubusercontent.com/30327956/121781453-18243300-cba5-11eb-9531-e53b00cc56ce.png)

