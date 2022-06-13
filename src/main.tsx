
import { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import CounterApp from './components/counter/CounterApp';
import Records from './components/records/Records';

const container = document.querySelector('#root');

const root = createRoot(container!);

root.render(
  
  <StrictMode>
 
      <CounterApp value={0} />
      <Records />
  
</StrictMode>
)