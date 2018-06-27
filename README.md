# getting-started-hello-world

Build and start server:

```
npm start
```

Open:

`http://localhost:1234/`

# Getting Started Guide

How to create a new web application:

## 1. Create new repository at GitHub.
## 2. Clone repository locally.

```
git clone https://github.com/geoffreyhale/getting-started-hello-world.git
```

Add exclusions:

```
vim .gitignore
```

Add private local git exclusions:
  
```
vim .git/info/exclude
```

Add new commits and push to remote:

```
git add -A
git commit -m 'commit message'
git push -u origin master
```

## 3. Package Manager (npm or Yarn)

### npm:

Generate `package.json`:

```
npm init -y
```

> `-y`: generate without asking any questions

## 4. Bundler (Webpack or Parcel)

### Parcel:

https://parceljs.org/getting_started.html

```
npm install parcel-bundler

```

Create `index.html`

```
<html>
<body>
  <script src="./index.js"></script>
</body>
</html>
```

Create `index.js`

```
console.log("hello world");
```

Build and start server:

```
parcel index.html
```

Open:

`http://localhost:1234/`

#### Production:

https://parceljs.org/production.html

```
parcel build entry.js
```

