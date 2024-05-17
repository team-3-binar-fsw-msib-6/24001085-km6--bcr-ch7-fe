import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import { ThemeProvider } from "./utils/ThemeProvider";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  ElectionPage,
  HomePage,
  LoginPage,
  NonProtectedPage,
  NotFoundPage,
  ProtectedPage,
  RegisterPage,
} from "./pages";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedPage>
        <Layout>
          <HomePage />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/register",
    element: (
      <NonProtectedPage>
        <AuthLayout>
          <RegisterPage />
        </AuthLayout>
      </NonProtectedPage>
    ),
  },
  {
    path: "/login",
    element: (
      <NonProtectedPage>
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      </NonProtectedPage>
    ),
  },
  {
    path: "/election",
    element: (
      <ProtectedPage>
        <Layout>
          <ElectionPage />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
