import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AuthProvider>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
