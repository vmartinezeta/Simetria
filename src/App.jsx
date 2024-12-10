import Simetria from "./Simetria";
import SimetriaProvider from "./SimetriaContext";

export default function App() {
  return <SimetriaProvider>
    <Simetria />
  </SimetriaProvider>
}