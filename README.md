# xw

## Configuration

The repository includes [example passwords](https://passwordsgenerator.net/) to use for local development.

`api/.env`
```
API_URL=127.0.0.1:8080
DATABASE_URL=postgres://api:<API_PASSWORD>@localhost:5432/xw
```

`client/.env`
```
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_NAME=xw
```

`client/package.json`
```json
{
  "proxy": "http://localhost:8080"
}
```

`flyway/secrets/flyway.conf`

```
flyway.password=<FLYWAY_PASSWORD>
```

`postgres/secrets/API_PASSWORD`

```
<API_PASSWORD>
```
`postgres/secrets/FLYWAY_PASSWORD`

```
<FLYWAY_PASSWORD>
```

`postgres/secrets/POSTGRES_PASSWORD`

```
<POSTGRES_PASSWORD>
```
