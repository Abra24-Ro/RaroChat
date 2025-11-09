import {
  type RouteConfig,
  index,
  layout,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  //HOme
  index("routes/home.tsx"),

  //Auth

  ...prefix("/auth", [
    layout("layouts/auth-layout.tsx", [
      route("login", "routes/auth/login-page.tsx"),
      route("register", "routes/auth/register-page.tsx"),
      route("testing", "routes/auth/testing-page.tsx"),
      route("testing-args/:id", "routes/auth/testing-args-page.tsx"),
    ]),

    //actions 

    route("logout", "auth/actions/logout.action.ts"),
  ]),

  //?chat

  ...prefix("/chat", [
    layout("layouts/chat-layout.tsx", [
      index("routes/chat/not-chat-selected-page.tsx"),
      route("client/:id", "routes/chat/client-chat-page.tsx"),
    ]),
  ]),

  //product
  route("product/:name", "routes/product.tsx"),

] satisfies RouteConfig;
