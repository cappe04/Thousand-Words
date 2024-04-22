@echo off
setlocal

if "%1"=="" (
    echo No argument provided.
    goto end:
)

if %1==server (
    echo Building server...
    docker build -t thousand-words .
) else (
    echo Not implemented or invalid.
)

:end