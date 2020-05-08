import React, { lazy } from "react";

const signing = lazy(() => import("../page/signing/signing"));
const userAgreement = lazy(() => import("../page/userAgreement/userAgreement"));
const privacy = lazy(() => import("../page/privacy/privacy"));
const Hassigned = lazy(() => import("../page/Hassigned/HasSigned"));

export default {
  signing,
  privacy,
  userAgreement,
  Hassigned
};
