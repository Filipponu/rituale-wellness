@echo off
title Rituale - server locale
cd /d "%~dp0"
echo.
echo Avvio di Rituale su http://localhost:3000
echo Lascia aperta questa finestra mentre usi il sito.
echo.
npm start
echo.
echo Il server si e' chiuso. Premi un tasto per leggere eventuali messaggi.
pause
