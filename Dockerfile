FROM python:3.12

WORKDIR /app

COPY server/requirements.txt ./
COPY .env ./
COPY server/run.py ./

RUN pip install -r requirements.txt

COPY server/app /app/app

EXPOSE 8080

CMD ["python", "run.py"]