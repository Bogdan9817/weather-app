import { Provider } from "react-redux";
import { store } from "./store/store";
import { render } from "@testing-library/react";

const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: Providers, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
