import './App.css';
import CenterPanel from './components/CenterPanel.tsx';
import LeftPanel from './components/LeftPanel.tsx';

function App() {
  return (
    <div className="App">
      <LeftPanel />
      <CenterPanel />
    </div>
  );
}

export default App;
