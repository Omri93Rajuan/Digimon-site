import "./App.css";
import Layout from "./layout/layout";
import { CartProvider } from "./providers/CartProvider";
import AppRouter from "./router/appRouter";
function App() {
  return (
    <>
      <CartProvider>
        <Layout children={<AppRouter />} />
      </CartProvider>
    </>
  );
}

export default App;
