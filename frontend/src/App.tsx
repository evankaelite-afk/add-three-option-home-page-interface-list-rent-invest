import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import SiteLayout from './components/site/SiteLayout';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import LegalCompliancePage from './pages/LegalCompliancePage';
import JoinEarlyAccessPage from './pages/JoinEarlyAccessPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ListingPage from './pages/ListingPage';
import RentPage from './pages/RentPage';
import InvestPage from './pages/InvestPage';
import CreateListingPage from './pages/CreateListingPage';
import MyListingsPage from './pages/MyListingsPage';

const rootRoute = createRootRoute({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const propertiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/properties',
  component: PropertiesPage,
});

const propertyDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/properties/$propertyId',
  component: PropertyDetailsPage,
});

const howItWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/how-it-works',
  component: HowItWorksPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const legalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal',
  component: LegalCompliancePage,
});

const joinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/join',
  component: JoinEarlyAccessPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboardPage,
});

const listingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/listing',
  component: ListingPage,
});

const createListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/listing/create',
  component: CreateListingPage,
});

const myListingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-listings',
  component: MyListingsPage,
});

const rentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rent',
  component: RentPage,
});

const investRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/invest',
  component: InvestPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  propertiesRoute,
  propertyDetailsRoute,
  howItWorksRoute,
  aboutRoute,
  legalRoute,
  joinRoute,
  adminRoute,
  listingRoute,
  createListingRoute,
  myListingsRoute,
  rentRoute,
  investRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
