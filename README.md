### Technologies
* [create-react-app](https://github.com/facebook/create-react-app) |
[React](https://reactjs.org) | [React Router](https://reacttraining.com/react-router) |
[Redux](https://redux.js.org) | [Redux Form](https://redux-form.com/7.3.0) |
[Material-UI](https://material-ui-next.com) |
[axios](https://github.com/axios/axios) | [moxios](https://github.com/axios/moxios) |
[Jest](https://facebook.github.io/jest) | [Storybook](https://storybook.js.org)
### Local setup
* API needs to be run first
* `git clone` repo and `npm install` from root
* `npm run start` will automagically navigate to `localhost:3000`
* `npm test` to run tests
* `npm run storybook` to see stories
### Basic workflow (FE & BE)
* `setup` project locally
* create `new task`
* checkout the development branch with `git checkout staging`
* create separate branch with `git checkout -b task_id-description-of-the-task`
* push new branch to remote with `git push -u origin task_id-description-of-the-task`
* `git commit -m "task_id: message content"` & `git push` while working on an implementation
* when done implementing and tested locally, create `pull request` from feature to development branch, this will trigger automatic `Jenkins build`
* if build is successful, `merge` pull request
### Remote environments
* STAGING - [https://staging-puzzle-games.herokuapp.com](https://staging-puzzle-games.herokuapp.com)
* TEST - [https://test-puzzle-games.herokuapp.com](https://test-puzzle-games.herokuapp.com)
* PRODUCTION - [https://puzzle-games.herokuapp.com](https://puzzle-games.herokuapp.com)
### Other links
* Jenkins - [http://ec2-35-158-121-12.eu-central-1.compute.amazonaws.com](http://ec2-35-158-121-12.eu-central-1.compute.amazonaws.com)
* ZenHub - [https://app.zenhub.com/workspace/o/karmello/puzzle-games](https://app.zenhub.com/workspace/o/karmello/puzzle-games)
