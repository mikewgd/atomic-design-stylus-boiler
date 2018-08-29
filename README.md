## Intro
This is a boilerplate that I use for ReactJS projects. It is based off of [ARc](https://github.com/diegohaz/arc), but has a few extra features: **bootstrap v4**, a **Node.js server** proxy, uses **stylus** and  **Google Fonts webpack**.

## Setup

### 1. Get the source code
```sh
$ git clone https://github.com/mikewgd/atomic-design-stylus-boiler my-app
$ cd my-app
```

### 2. Install dependencies

```sh
$ npm install
```

### 3. Run the app

```sh
$ npm run dev
```

It will start the development server with [HMR](https://webpack.github.io/docs/hot-module-replacement) on top of it. It will also be running the Node server to use a proxy.

> [http://localhost:3000](http://localhost:3000) — Development server
> [http://localhost:5000](http://localhost:5000) — Node.js server

Now you can open [http://localhost:3000](http://localhost:3000) in browser and start developing.

## Resources
- [ARc](https://github.com/diegohaz/arc)
- [Wiki](https://github.com/diegohaz/arc/wiki) -- Really great documentation here on atomic design, using the boilerplate etc.. 
- [Wiki: Atomic Design](https://github.com/diegohaz/arc/wiki/Atomic-Design)
- [ARc Demo](https://arc.js.org/)