![logo MovieCheck](./assets/MovieCheckBaner.png)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![pgAdmin](https://img.shields.io/badge/pgAdmin-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Projekt ma na celu pomóc użytkownikowi w wyborze filmu do obejrzenia. Aplikacja będzie umożliwiała przeglądanie listy filmów, wyszukiwanie ich oraz zapisywanie wybranych tytułów do listy ulubionych. Można wystawiać i przeglądać recenzje oraz oddawać ocene (od 1 do 10) na wybrany film, ale tylko raz bez edycji późniejszej.

Projekt został w pełni **skonteneryzowany za pomocą Dockera**. Cały kod, biblioteki oraz konfiguracja środowiska zostały zamknięte wewnątrz niezależnego kontenera.

Izolacja środowiska gwarantuje stabilność, bezpieczeństwo i błyskawiczne uruchomienie bez konieczności ręcznej instalacji baz danych czy dodatkowych pakietów.

## **Aplikacja webowa bez Dockera**

Instalacja oraz kod źródłowy aplikacji webowej w wersji bez wsparcia dla środowiska Docker zostały wydzielone na osobną gałąź [**web-app**](https://github.com/TAW-26/Web-App-Szymon-Pietruszka/tree/web-app)


## Instrukcja uruchomienia

Aby uruchomić aplikację na swoim komputerze, upewnij się, że masz zainstalowany program [**Docker Desktop**](https://docs.docker.com/desktop/). Jeżeli pracujesz na windows to pobierz jeszcze `WSL` za pomocą komendy:

```bash
wsl --install
```

Po pobraniu projektu wpisz do terminala w głównym folderze projektu w głównym folderze projektu (tam, gdzie znajduje się plik `Dockerfile` lub `docker-compose.yml`)

```bash
docker compose up --build
```

Po zakończeniu procesu aplikacja będzie dostępna w przeglądarce internetowe na `http://localhost`

## Diagram ERD
Przedstawia strukturę bazy danych aplikacji. System przechowuje informacje o filmach, użytkownikach, aktorach, gatunkach, ocenach, recenzjach, polubionych filmach oraz relacjach między nimi.

![ERD](./Doc/img/ERD.png)

## Diagram Przypadków Użycia

Przedstawia funkcje dostępne dla użytkowników zalogowanych i niezalogowanych. Użytkownik niezalogowany może się rejestrować i przeglądać filmy, natomiast zalogowany korzysta z pełnych funkcji systemu, takich jak ocenianie, recenzowanie, polubienie filmu oraz przeglądanie proponowanych dla użytkownika filmów. Backend odpowiada za wykonywanie algorytmów oraz automatyczne aktualizowanie ocen filmów.

![DPU](./Doc/img//DPU.png)


## Dokumentacja
Szczegółowe informacje dotyczące aplikacji:
- [temat aplikacji webowej](./Doc/TOPIC.md)
- [dokumentacji projektu](./Doc/TOPIC.md)
- [monitorowanie aplikacji](./Doc/MONITORING.md)
- [opis API](./Doc/API.md)
- [opis UI](./Doc/UI.md)
