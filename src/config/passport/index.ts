import * as session from "express-session";

const sessionConfig: session.SessionOptions = {
  secret: process.env.SECRET ?? "secret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: "/",
    httpOnly: true,
    secure: false,
    maxAge: 360 * 1000, // 1 hour
  },
};

export default sessionConfig;