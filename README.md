# MovieCheck

Projekt ma na celu pomóc użytkownikowi w wyborze filmu do obejrzenia. Aplikacja będzie wykorzystywać algorytm, który na podstawie preferencji użytkownika będzie proponował filmy dopasowane do jego gustu. System będzie analizował wcześniejsze polubienia użytkownika, aby lepiej dopasować kolejne rekomendacje.

Aplikacja będzie również umożliwiała przeglądanie listy filmów, wyszukiwanie ich oraz zapisywanie wybranych tytułów do listy ulubionych. Zebrane dane o ocenach i polubieniach będą wykorzystywane przez algorytm do rekomendacji filmów.

## Technologie

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![pgAdmin](https://img.shields.io/badge/pgAdmin-336791?style=for-the-badge&logo=postgresql&logoColor=white)

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
albo:
```bash
npx ng serve
```

Następnie można przejść do: http://localhost:4200

## Serwer

Lokalny serwer backendowy stworzony w frameworku **FastAPI**. Serwer odpowiada za komunikację z zewnętrzną bazą danych oraz udostępnianie punktów końcowych dla aplikacji. Aby uruchomić serwer trzeba wejść w folder `Backend` i wpisać komende:

```bash
uvicorn main:app --reload
```

Serwer jest dostępny pod adresem: http://localhost:8000

## Dokumentacja
Po więcej szczegółowych informacji dotyczącej aplikacji można przeczytać w [dokumentacji projektu](./docs/topic-selection.md).