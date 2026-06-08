# Monitoring Aplikacji

Aplikacja MovieCheck wykorzystuje dwupoziomowy system monitorowania stanu i diagnozy błędów, oparty na logach systemowych oraz zewnętrznej platformie Sentry.

## Logi Kontenerów
Głównym narzędziem diagnostycznym są zagregowane logi systemowe zbierane bezpośrednio z kontenerów Docker.

**Podgląd logów w czasie rzeczywistym:**

```bash
docker compose logs -f
```

# Sentry
### Monitorowanie Awarii w Kodzie
W projekcie MovieCheck platforma ta służy do natychmiastowego przechwytywania awarii kodu, takich jak błędy połączenia z bazą danych, niepoprawne haszowanie czy błędy w operacjach na danych. **Sentry** automatycznie agreguje usterki i wskazuje dokładną linię kodu, która spowodowała crash aplikacji.

### Konfiguracja
Aby monitorować aplikacje trzeba dodać klucz z oficjalnej strony [Sentry](https://sentry.io/welcome/). Zaloguj się i stwórz nowy projekt. Następnie wybierz platformę **(Python/FastAPI)** i skopiuj klucz `DSN` wklejając go do pliku `.env`.

```python
DSN_KEY="KLUCZ"
```
