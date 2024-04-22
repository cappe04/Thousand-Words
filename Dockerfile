FROM python:3.12

WORKDIR /app

COPY server/requirements.txt ./

RUN pip install -r requirements.txt

COPY server/app /app/app

EXPOSE 8080

CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:create_app()"]