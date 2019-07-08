import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, LoginLayout } from "./layouts";


// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Login from "./views/Login";
import DossiersMedicaux from "./views/DossiersMedicaux";
import DossierMedical from "./views/DossierMedical";
import Consultation from "./views/Consultation";
import Visualisation from "./views/Visualisation";
import Video from "./views/Video";


export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/login",
    layout: LoginLayout,
    component: Login
  },
  {
    path: "/dossiers",
    layout: DefaultLayout,
    component: DossiersMedicaux
  },
  {
    path: "/dossier-patient",
    layout: DefaultLayout,
    component: DossierMedical
  },
  {
    path: "/details-consultation",
    layout: DefaultLayout,
    component: Consultation
  },
  {
    path: "/visualisation-ecg",
    layout: DefaultLayout,
    component: Visualisation
  },
  {
    path: "/video-conference",
    layout: DefaultLayout,
    component: Video
  }
];
