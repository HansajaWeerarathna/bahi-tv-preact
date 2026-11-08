import { useEffect } from 'preact/hooks';
import { lazy, LocationProvider, Route, Router } from 'preact-iso';
import { startClock } from '@/entities/clock';
import { systemState } from '@/entities/session';
import { ROUTES } from '@/shared/config';
import { RemoteControl } from '@/shared/remote-navigation';
import { NotFoundView, Toast } from '@/shared/ui';
import { HomePage } from '@/pages/home';
import { startAlarmRing } from '@/features/alarms';
import { DemoKeys, isDemoMode } from '@/features/demo-tools';
import { VolumeKeys } from '@/features/volume';
import { SystemScreen } from '@/widgets/system-screen';
import { TvCanvas } from './TvCanvas';
import { useDocumentPreferences } from './useDocumentPreferences';

// Every page except the home screen loads on first visit, to keep the TV's first download small.
const EmergencyPage = lazy(() => import('@/pages/emergency').then((m) => m.EmergencyPage));
const FrontDeskPage = lazy(() => import('@/pages/front-desk').then((m) => m.FrontDeskPage));
const MessagesPage = lazy(() => import('@/pages/messages').then((m) => m.MessagesPage));
const CheckOutPage = lazy(() => import('@/pages/check-out').then((m) => m.CheckOutPage));
const TvPage = lazy(() => import('@/pages/tv').then((m) => m.TvPage));
const ThingsToDoPage = lazy(() => import('@/pages/things-to-do').then((m) => m.ThingsToDoPage));
const OfferPage = lazy(() => import('@/pages/things-to-do').then((m) => m.OfferPage));
const WifiPage = lazy(() => import('@/pages/wifi').then((m) => m.WifiPage));
const CastPage = lazy(() => import('@/pages/cast').then((m) => m.CastPage));
const StayPage = lazy(() => import('@/pages/stay').then((m) => m.StayPage));
const WeatherPage = lazy(() => import('@/pages/weather').then((m) => m.WeatherPage));
const RoomControlsPage = lazy(() =>
  import('@/pages/room-controls').then((m) => m.RoomControlsPage),
);
const AlarmsPage = lazy(() => import('@/pages/alarms').then((m) => m.AlarmsPage));
const AlarmEditPage = lazy(() => import('@/pages/alarms').then((m) => m.AlarmEditPage));
const RoomServicePage = lazy(() => import('@/pages/room-service').then((m) => m.RoomServicePage));
const MenuItemPage = lazy(() => import('@/pages/room-service').then((m) => m.MenuItemPage));
const RequestPage = lazy(() => import('@/pages/room-service').then((m) => m.RequestPage));
const OrderReviewPage = lazy(() => import('@/pages/room-service').then((m) => m.OrderReviewPage));
const OrderDonePage = lazy(() => import('@/pages/room-service').then((m) => m.OrderDonePage));
const RequestDonePage = lazy(() => import('@/pages/room-service').then((m) => m.RequestDonePage));
const SettingsPage = lazy(() => import('@/pages/settings').then((m) => m.SettingsPage));
const RemoteHelpPage = lazy(() => import('@/pages/settings').then((m) => m.RemoteHelpPage));
const SearchPage = lazy(() => import('@/pages/search').then((m) => m.SearchPage));

export function App() {
  useDocumentPreferences();
  useEffect(() => startClock(), []);
  useEffect(() => startAlarmRing(), []);

  const system = systemState.value;

  return (
    <LocationProvider>
      <RemoteControl blocked={system !== 'ready'} />
      <VolumeKeys />
      <TvCanvas>
        {system === 'ready' ? (
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
            <Route path={ROUTES.roomControls} component={RoomControlsPage} />
            <Route path={ROUTES.alarms} component={AlarmsPage} />
            <Route path={ROUTES.alarmEdit} component={AlarmEditPage} />
            <Route path={ROUTES.roomService} component={RoomServicePage} />
            <Route path={ROUTES.roomServiceItem} component={MenuItemPage} />
            {/* Literal routes must come before ":requestId", or "done" is read as a request id. */}
            <Route path={ROUTES.roomServiceRequestDone} component={RequestDonePage} />
            <Route path={ROUTES.roomServiceRequest} component={RequestPage} />
            <Route path={ROUTES.roomServiceOrder} component={OrderReviewPage} />
            <Route path={ROUTES.roomServiceOrderDone} component={OrderDonePage} />
            <Route path={ROUTES.settings} component={SettingsPage} />
            <Route path={ROUTES.remoteHelp} component={RemoteHelpPage} />
            <Route path={ROUTES.search} component={SearchPage} />
            <Route default component={NotFoundView} />
          </Router>
        ) : (
          <SystemScreen state={system} />
        )}
        <Toast />
        {isDemoMode && <DemoKeys />}
      </TvCanvas>
    </LocationProvider>
  );
}
