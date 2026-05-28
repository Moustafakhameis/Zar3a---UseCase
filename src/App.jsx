import { DiagramProvider } from './context/DiagramContext';
import Zar3aUML from './pages/Zar3aUML';

function App() {
  return (
    <DiagramProvider>
      <Zar3aUML />
    </DiagramProvider>
  );
}

export default App;
