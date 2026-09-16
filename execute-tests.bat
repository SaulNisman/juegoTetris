@echo off
setlocal enabledelayedexpansion
cd /d c:\Users\DELL\OneDrive\Documentos\GitHub\juegoTetris
set "PATH=C:\Program Files\nodejs;!PATH!"
echo Instalando dependencias...
call npm install 2>&1
echo.
echo Ejecutando tests...
call npm test 2>&1
pause
