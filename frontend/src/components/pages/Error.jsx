import MainNavigation from "../MainNavigation.js";
import PageContent from "../PageContent.jsx";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  console.log(error.status );
  let title = "An error ocurred";
  let message = "Something went wrong";

  
  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    message = 'Page could not be found'
  }

  return<>
   <MainNavigation></MainNavigation>
   <PageContent title = {title}>{message}</PageContent>
  </>
  
}
