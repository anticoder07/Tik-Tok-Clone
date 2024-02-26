import HeaderOnly from "../layouts/HeaderOnly";
import Home from "../pages/Home";
import UpLoad from "../pages/UpLoad";

import Test from "./Test";

const publicRouter = [
  { path: "/", component: Home },
  { path: "/en", component: Home },
  { path: "/following", component: Home },
  { path: "/@hoaahanassii", component: Test },
  { path: "/up-load", component: UpLoad, layout: HeaderOnly },
];

const privateRouter = [];

export { publicRouter, privateRouter };
