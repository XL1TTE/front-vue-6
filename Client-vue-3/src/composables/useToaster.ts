import { createToaster } from "@meforma/vue-toaster";

export function useToaster(duration: number, position: "top-right") {
  const toaster = createToaster({
    position: position,
    duration: duration,
  });

  const success = (message: string) => {
    toaster.success(message);
  };
  const error = (error: string) => {
    toaster.error(error);
  };

  return {
    success,
    error,
  };
}
