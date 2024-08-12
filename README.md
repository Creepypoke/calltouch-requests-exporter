# Calltouch Requests Exporter

Microservice based on pure Deno runtime and std libraries. It can export data from csv file to  [Calltouch Requests](https://www.calltouch.ru/support/api/zayavki/).

## CSV file format requirements

delimiter: `,`

### Columns mapping

```
"Название формы" -> subject
sent -> requestDate
phone -> phoneNumber
name -> fio
raiting -> comment.text
tags -> addTags
manager -> manager
source -> customSources.source
medium -> customSources.medium
source -> customSources.campaign
```

## API

### `POST /import-requests`

Header `Content-type` must be `multipart/form-data`
Body `requests-file` field name must be defined

### `GET /healthcheck`

Health check status endpoint
