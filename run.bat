@echo off
setlocal

if "%1"=="" (
    echo No argument provided.
    goto end:
)

if "%1"=="server" (
    echo Running server at 192.168.1.51:5000.
    docker run -p 192.168.1.51:5000:8080 thousand-words
) else (
    echo Not implemented or invalid.
)

:end


