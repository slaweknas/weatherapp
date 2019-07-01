# Langspire
## Requirements
  * Docker
  * Docker Compose

## Installation and usage

#### Installation

* Enter `.docker` directory
```
cd .docker/
```
* Copy correct environment file to `.env` file
```
cp .env.dev.dist .env
```

| Environment      | .env file             | Host                                                                         |
| ---------------  | --------------------- | ---------------------------------------------------------------------------- |
| **Development**  | `.env.dev.dist`       | [localhost:8000](localhost:8000)                                             |
| **BldrReview**   | `.env.review.dist`    | [https://langspire.bldr.review/](https://langspire.bldr.review/)             |
| **Staging**      | *not created yet*     | *not specified yet*                                                          |
| **Production**   | *not created yet*     | *not specified yet*                                                          |

* Adding new environment requires create `.env.ENV.dist` file with correct variables values

#### Usage

* Run application by `docker-compose`, on production env use `--build -d` flags
```
docker-compose up
```
or
```
docker-compose up --build -d
```

## Contributing :school_satchel:

`master` - production environment<br>
`staging` - xspreview environment<br>
`develop` - development/xstest branch

`{type}/{name}` -  branch pattern

```
├─── feature/          # + {name}
└─── fix/              # + {name}
```

## What you should use in IDE

* `Prettier`
* `Editorconfig`
* `ESLint`

## Guidelines

### CSS in JS
* don't use horizontally asymmetric margin or padding(`margin: 0 12px 0 5px`), it won't get transformed correctly in RTL. Instead use `padding-left/right`

## Production

#### First time host configuration

*  Install app in `/srv/docker/` without changing directory name (`takamol-br-spa`)

*  Copy correct environment file to `.env` file

```bash
cp .docker/.env.review.dist .docker/.env
```
