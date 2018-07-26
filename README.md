# five-in-a-row

A playable frontend version of Pente (includes capture) and bot opponent.

## Launch

Install packages:

```
npm i
```

Build and start server:

```
npm start
```

Open:

`http://localhost:1234/`

## How project was initially created:

1. Create new repository at GitHub called `five-in-a-row`.
2. Push existing `getting-started-hello-world` project with history.

```
cd ~/.../getting-started-hello-world
git push https://github.com/geoffreyhale/five-in-a-row.git +master:master
cd ~/.../five-in-a-row
git clone https://github.com/geoffreyhale/five-in-a-row.git
```

Fix/update `package.json` details, etc.

## Notes

- Decouple game logic and view logic
  - In gameloop, pass game data to view.update(data) 