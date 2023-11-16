import { ToastContainer as BaseToastContainer, Slide } from "react-toastify";

import typography from "../../../styles/typography";

import "./Toast.css";

export default function ToastContainer() {
  return (
    <BaseToastContainer
      position="top-center"
      autoClose={1000}
      closeButton={false}
      hideProgressBar
      pauseOnHover={false}
      draggable={false}
      limit={1}
      transition={Slide}
      bodyClassName={typography.$semantic.title4Bold}
    />
  );
}
