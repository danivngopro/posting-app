import * as env from 'env-var';

export const config = {
  users: {
    usersConnectionString: env
      .get('USERS_CONNECTION_URL')
      .default('https://jsonplaceholder.typicode.com/users')
      .asString(),
  },
  todos: {
    todosConnectionString: env
      .get('TODOS_CONNECTION_URL')
      .default('https://jsonplaceholder.typicode.com/todos')
      .asString(),
  },
  posts: {
    postsConnectionString: env
      .get('POSTS_CONNECTION_URL')
      .default('https://jsonplaceholder.typicode.com/posts')
      .asString(),
  },
};