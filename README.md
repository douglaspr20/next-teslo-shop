# Next.js Telo Shop
Run databe in locla enviroment with docker.
```
docker-compose up -d
```

## Configure enviroment variables
Rename the file __.env.template__ a __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```

* intsall Dependencies and run project
```
yarn install
yarn dev
```


## To get the seed data request the next url

call:
```
http://localhost:3000/api/seed
```
