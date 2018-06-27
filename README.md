# getting-started-hello-world

1. Create new repository at GitHub.
2. Clone repository locally.

```
git clone https://github.com/geoffreyhale/getting-started-hello-world.git
```

- Add private local git exclusions:
  
  ```
  vim .git/info/exclude
  ```

3. Package Manager (npm or Yarn)

Generate `package.json`:

```
npm init -y
```

> `-y`: generate without asking any questions

# git

```
git add -A
git commit -m 'commit message'
git push -u origin master
```