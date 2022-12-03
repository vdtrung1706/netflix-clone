<h1 align="center">A Netflix Clone Application</h1>

## Live Demo

- [Netlify](https://netflix-clone-pyon-a0a415.netlify.app)
- [Youtube (4mins)](https://www.youtube.com/watch?v=ZF2_Z1vPavg)

### If you catch something like this on the browser. Don't worry, it's safe. You can visit the site by click on "Details"
![Screen Shot 2022-12-03 at 9 17 51 PM](https://user-images.githubusercontent.com/96437142/205445607-dbe96ca1-cb1a-43e6-9846-c7c58b6c9e03.png)



## Tech Stack

- [TMDb API's](https://www.themoviedb.org/)
- [Firebase](https://firebase.google.com/)
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Material UI](https://mui.com/)
- [Netlify](https://www.netlify.com/)

## Features

- Google authentication
- Movies slider
- Preview movie popper & detail modal
- Movie player
- Infinite scroll
- Rating movie
- Skeleton loading
- Code splitting
- Responsive layout, etc

## About

This repo was inspired by [Fakeflix](https://github.com/Th3Wall/Fakeflix) of [Davide Mandelli](https://github.com/Th3Wall) on Github. He's amazing.

I've done it like the Netflix original as much as I can. The aim is that I can put what I've learned about React into practice.

Hopefully, you're gonna like it.

## Quick Start

### Netlify deploy

1. Create your firebase projects & config ur firebase (auth, rules...)
2. Replace the `firebaseConfig` in `src/firebase/index.js` with your `firebaseConfig`
3. Fork the repo
4. Connect your Github to Netlify
5. Build command: `npm run build:prod`
6. Publish directory: `dist/`
7. Add your environment variables such as `API_BASE, API_KEY, IMAGE_BASE`...
8. Add the netlify domain that you've just deployed to your firebase project in `Authentication/sign-in method`

### Run locally

- Nodejs v16 installed

- Clone then go to the project

```bash
  git clone https://github.com/vdtrung1706/netflix-clone.git
```

- Install dependencies

```bash
  npm install
```

- create `.env` file which includes

```bash
API_KEY=YOUR_API_KEY_HERE(get one on themoviedb)
API_BASE=https://api.themoviedb.org/3
IMAGE_BASE=https://image.tmdb.org/t/p
```

- Start

```bash
  npm run dev
```

## License

MIT

## Sreenshots

Wellcome
![Screenshot](https://drive.google.com/uc?export=view&id=1u_6aMT3nrutG7FXYjlqHq1TihB9YCR7D)

Login
![Screenshot](https://drive.google.com/uc?export=view&id=12h9O1xpLixnRpPjDEDAEjhB5WM1hBEZp)

Home
![Screenshot](https://drive.google.com/uc?export=view&id=1jNG3V1K3wT5oH_C1MlMoEyiB_VthzfAU)

Search
![Screenshot](https://drive.google.com/uc?export=view&id=1uWX-krE46FGfFIQg3z0RBJBWTl2_eQfR)

Modal
![Screenshot](https://drive.google.com/uc?export=view&id=1KgianpgZfymOTrnHkm6MNoKJyQCgo184)

Player
![Screenshot](https://drive.google.com/uc?export=view&id=1TBuP4L-SpEXUGFM8zDXKyWBrwdGJhMmC)
