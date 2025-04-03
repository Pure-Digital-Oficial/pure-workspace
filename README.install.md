# Workspaces

## Comandos Front

### Angular

- npm i -D @nx/angular
- npx nx g @nx/angular:application --name=<nome da aplicação> --directory=apps/front/<nome do diretorio> --routing=true --style=scss --standalone=false --no-interactive

## React

- npm add -D @nx/react
- npx nx g @nx/react:application --name=web-pure-institutional --directory=apps/web/web-pure-institutional --globalCss=true --projectNameAndRootFormat=as-provided --routing=true --style=scss --tags=application
- nx g @nx/react:library --name=feature --unitTestRunner=jest --directory=libs/feature --projectNameAndRootFormat=as-provided

## Next

- npm add @nx/next
- npx nx g @nx/next:app apps/web/web-pure-digital
- npx nx g @nx/next:lib libs/feature

## Comandos Back

### NestJs

- npx nx add @nx/nest
- npx nx g @nx/nest:app <nome da aplicacao> --frontendProject=<nome da aplicação do front> --directory=<nome do diretorio> --strict=true
- nx g resource [RESOURCE_NAME] -p [APPLICATION_NAME]

## Comandos de biblioteca

- npx nx g @nx/js:lib --name=<nome da biblioteca> --unitTestRunner=jest --directory=libs/<nome do diretorio> --projectNameAndRootFormat=as-provided

## Comandos de configuração

- npx create-nx-workspace@latest nx-test
- npm i -D husky lint-staged
- npx husky init
- echo "npx lint-staged" > .husky/pre-commit
- npm i @nestjs/passport passport passport-local
- npm i -D @types/passport-local
- npm i @nestjs/jwt passport-jwt
- npm i -D @types/passport-jwt
