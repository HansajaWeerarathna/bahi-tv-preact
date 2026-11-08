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
import { OfferPage, ThingsToDoPage } from '@/pages/things-to-do';
import { CastPage } from '@/pages/cast';
import { StayPage } from '@/pages/stay';
import { WeatherPage } from '@/pages/weather';
import { WifiPage } from '@/pages/wifi';
import {
  MenuItemPage,
  OrderDonePage,
  OrderReviewPage,
  RequestDonePage,
  RequestPage,
  RoomServicePage,
} from '@/pages/room-service';
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
          <Route path={ROUTES.thingsToDo} component={ThingsToDoPage} />
          <Route path={ROUTES.offer} component={OfferPage} />
          <Route path={ROUTES.wifi} component={WifiPage} />
          <Route path={ROUTES.cast} component={CastPage} />
          <Route path={ROUTES.stay} component={StayPage} />
          <Route path={ROUTES.weather} component={WeatherPage} />
          <Route path={ROUTES.roomService} component={RoomServicePage} />
          <Route path={ROUTES.roomServiceItem} component={MenuItemPage} />
          <Route path={ROUTES.roomServiceRequest} component={RequestPage} />
          <Route path={ROUTES.roomServiceOrder} component={OrderReviewPage} />
          <Route path={ROUTES.roomServiceOrderDone} component={OrderDonePage} />
          <Route path={ROUTES.roomServiceRequestDone} component={RequestDonePage} />
          <Route default component={PlaceholderPage} />
        </Router>
        <Toast />
        {isDemoMode && <DemoKeys />}
      </TvCanvas>
    </LocationProvider>
  );
}
