import { useEffect } from 'preact/hooks';
import { LocationProvider, Route, Router } from 'preact-iso';
import { startClock } from '@/entities/clock';
import { ROUTES } from '@/shared/config';
import { RemoteControl } from '@/shared/remote-navigation';
import { Toast } from '@/shared/ui';
import { HomePage } from '@/pages/home';
import { PlaceholderPage } from '@/pages/placeholder';
import { EmergencyPage } from '@/pages/emergency';
import { FrontDeskPage } from '@/pages/front-desk';
import { DemoKeys, isDemoMode } from '@/features/demo-tools';
import { TvCanvas } from './TvCanvas';
import { useDocumentPreferences } from './useDocumentPreferences';

export function App() {
  useDocumentPreferences();
  useEffect(() => startClock(), []);

  return (
    <LocationProvider>
      <RemoteControl />
      <TvCanvas>
        <Router>
          <Route path={ROUTES.home} component={HomePage} />
          <Route path={ROUTES.frontDesk} component={FrontDeskPage} />
          <Route path={ROUTES.emergency} component={EmergencyPage} />
          <Route default component={PlaceholderPage} />
        </Router>
        <Toast />
        {isDemoMode && <DemoKeys />}
      </TvCanvas>
    </LocationProvider>
  );
}
