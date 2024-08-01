@echo off
SET "driverPath=%~dp0"
IF EXIST "%ProgramFiles(x86)%" (
"%driverPath%amd64\tapinstall.exe" install "%driverPath%amd64\OemVista.inf" tap0901
) ELSE (
"%driverPath%i386\tapinstall.exe" install "%driverPath%i386\OemVista.inf" tap0901
)