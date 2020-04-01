import { get, post, postBlob, put, del } from './helpers';

const directory = {
  info: () => ({ path: `/api/info`, method: 'get' }),

  user: {
    password: {
      reset: () => ({ path: `/api/user/password/reset`, method: 'post' }),
    },
  },
};

export default {
  get,
  post,
  postBlob,
  put,
  del,
  directory,
};
