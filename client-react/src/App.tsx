import "./App.css";
import Layout from "./layout/layout";
import { AuthProvider } from "./providers/authProvider";
import { CartProvider } from "./providers/CartProvider";
import AppRouter from "./router/appRouter";
function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Layout children={<AppRouter />} />
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
