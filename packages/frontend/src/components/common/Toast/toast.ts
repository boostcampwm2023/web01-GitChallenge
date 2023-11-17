import {
  type ToastContent,
  type ToastOptions,
  toast as baseToast,
} from "react-toastify";

import ToastIcon from "./ToastIcon";

export default function toast<TData = unknown>(
  content: ToastContent<TData>,
  options?: ToastOptions
) {
  return baseToast(content, options);
}

toast.success = (content: string, options?: ToastOptions) =>
  toast(content, {
    ...options,
    icon: ToastIcon.success,
  });

toast.error = (content: string, options?: ToastOptions) =>
  toast(content, {
    ...options,
    icon: ToastIcon.error,
  });
