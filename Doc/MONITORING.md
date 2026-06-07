# Monitoring Aplikacji

Aplikacja MovieCheck wykorzystuje dwupoziomowy system monitorowania stanu i diagnozy błędów.

## Logi Kontenerów
Głównym narzędziem diagnostycznym są zagregowane logi systemowe zbierane bezpośrednio z kontenerów Docker.

**Podgląd logów w czasie rzeczywistym:**

```bash
docker compose logs -f
```

**Podgląd logów konkretnej usługi np. backendu:**
```bash
docker compose logs backend -f
```