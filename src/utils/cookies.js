export const cookies = {
  getOptions: () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, //15 min
  }),
  set: (res, name, value, options = {}) => {
    res.cookies(name, value, { ...cookies.getOptions(), ...options });
  },
  clear: (res, name, options = {}) => {
    res.clear(name, { ...cookies.getOptions(), ...options });
  },
  get: (req, name) => {
    return req.cookies[name];
  },
};
