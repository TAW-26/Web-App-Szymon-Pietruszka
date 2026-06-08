![logo MovieCheck](./assets/MovieCheckBaner.png)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![pgAdmin](https://img.shields.io/badge/pgAdmin-336791?style=for-the-badge&logo=postgresql&logoColor=white)


Projekt ma na celu pomóc użytkownikowi w wyborze filmu do obejrzenia. Aplikacja będzie umożliwiała przeglądanie listy filmów, wyszukiwanie ich oraz zapisywanie wybranych tytułów do listy ulubionych. Można wystwaić i przeglądać recenzje oraz oddawać ocene na wybrany film.

## Instalacja

Przed uruchomieniem aplikacji trzeba zainstalować wymagane zależności projektu:

```bash
npm install
```

## Uruchomienie projektu

Aby uruchomić aplikacje należy użyć w folderze `Frontend` komende:

```bash
ng serve
```

Następnie można przejść do: http://localhost:4200

## Serwer

Lokalny serwer backendowy stworzony w frameworku **FastAPI**. Serwer odpowiada za komunikację z zewnętrzną bazą danych oraz udostępnianie punktów końcowych dla aplikacji. Aby uruchomić serwer trzeba wejść w folder `Backend` i wpisać komende:

```bash
uvicorn main:app --reload
```

Serwer jest dostępny pod adresem: http://localhost:8000

## Testy

Do przeglądania testów trzeba wpisać dane (nickname, password) a następnie przejśc do `test` i uruchomić:

```bash
pytest test_api.py -v
```

## Diagram ERD
Przedstawia strukturę bazy danych aplikacji. System przechowuje informacje o filmach, użytkownikach, aktorach, gatunkach, ocenach, recenzjach, polubionych filmach oraz relacjach między nimi.

![ERD](./Doc/img/ERD.png)

## Diagram Przypadków Użycia

Przedstawia funkcje dostępne dla użytkowników zalogowanych i niezalogowanych. Użytkownik niezalogowany może się rejestrować i przeglądać filmy, natomiast zalogowany korzysta z pełnych funkcji systemu, takich jak ocenianie, recenzowanie, polubienie filmu oraz przeglądanie proponowanych dla użytkownika filmów. Backend odpowiada za wykonywanie algorytmów oraz automatyczne aktualizowanie ocen filmów.

![Diagram Przypadków Użycia](./Doc/img//DPU.png)


## Dokumentacja
Szczegółowe informacje dotyczące aplikacji:
- [temat aplikacji webowej](./Doc/TOPIC.md)
- [dokumentacji projektu](./Doc/TOPIC.md)
- [opis API](./Doc/API.md)
- [opis UI](./Doc/UI.md)
