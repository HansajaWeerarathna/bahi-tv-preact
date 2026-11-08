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
import { MessagesPage } from '@/pages/messages';
import { CheckOutPage } from '@/pages/check-out';
import { TvPage } from '@/pages/tv';
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
          <Route path={ROUTES.messages} component={MessagesPage} />
          <Route path={ROUTES.checkOut} component={CheckOutPage} />
          <Route path={ROUTES.tv} component={TvPage} />
          <Route default component={PlaceholderPage} />
        </Router>
        <Toast />
        {isDemoMode && <DemoKeys />}
      </TvCanvas>
    </LocationProvider>
  );
}
