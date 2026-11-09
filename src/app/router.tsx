import { lazy } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  type RouteObject,
} from "react-router-dom";
import { PublicLayout } from "@/layouts/public-layout";

const FoundationPage = lazy(() =>
  import("@/pages/shared/foundation-page").then((module) => ({
    default: module.FoundationPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/shared/not-found-page").then((module) => ({
    default: module.NotFoundPage,
  })),
);
const HomePage = lazy(() =>
  import("@/pages/home/home-page").then((module) => ({
    default: module.HomePage,
  })),
);
const PropertyListingPage = lazy(() =>
  import("@/pages/shared/property-listing-page").then((module) => ({
    default: module.PropertyListingPage,
  })),
);
const LandProjectPage = lazy(() =>
  import("@/pages/lands/land-project-page").then((module) => ({
    default: module.LandProjectPage,
  })),
);
const LandMasterplanPage = lazy(() =>
  import("@/pages/lands/land-masterplan-page").then((module) => ({
    default: module.LandMasterplanPage,
  })),
);
const PlotDetailPage = lazy(() =>
  import("@/pages/lands/plot-detail-page").then((module) => ({
    default: module.PlotDetailPage,
  })),
);
const LandInformationPage = lazy(() =>
  import("@/pages/lands/land-information-page").then((module) => ({
    default: module.LandInformationPage,
  })),
);
const ApartmentProjectPage = lazy(() =>
  import("@/pages/apartments/apartment-project-page").then((module) => ({
    default: module.ApartmentProjectPage,
  })),
);
const TowerSelectorPage = lazy(() =>
  import("@/pages/apartments/tower-selector-page").then((module) => ({
    default: module.TowerSelectorPage,
  })),
);
const TowerFloorPage = lazy(() =>
  import("@/pages/apartments/tower-floor-page").then((module) => ({
    default: module.TowerFloorPage,
  })),
);
const FlatDetailPage = lazy(() =>
  import("@/pages/apartments/flat-detail-page").then((module) => ({
    default: module.FlatDetailPage,
  })),
);
const ApartmentInformationPage = lazy(() =>
  import("@/pages/apartments/apartment-information-page").then((module) => ({
    default: module.ApartmentInformationPage,
  })),
);
const ResidenceExperiencePage = lazy(() =>
  import("@/pages/apartments/residence-experience-page").then((module) => ({
    default: module.ResidenceExperiencePage,
  })),
);
const HousePage = lazy(() =>
  import("@/pages/houses/house-pages").then((module) => ({
    default: module.HousePage,
  })),
);
const VillaCommunityPage = lazy(() =>
  import("@/pages/villas/villa-pages").then((module) => ({
    default: module.VillaCommunityPage,
  })),
);
const VillaDetailPage = lazy(() =>
  import("@/pages/villas/villa-pages").then((module) => ({
    default: module.VillaDetailPage,
  })),
);
const VillaExperiencePage = lazy(() =>
  import("@/pages/villas/villa-experience-page").then((module) => ({
    default: module.VillaExperiencePage,
  })),
);
const ComparePage = lazy(() =>
  import("@/pages/workflows/compare-page").then((module) => ({
    default: module.ComparePage,
  })),
);
const FavoritesPage = lazy(() =>
  import("@/pages/workflows/favorites-page").then((module) => ({
    default: module.FavoritesPage,
  })),
);
const EnquiryPage = lazy(() =>
  import("@/pages/workflows/enquiry-page").then((module) => ({
    default: module.EnquiryPage,
  })),
);
const ScheduleVisitPage = lazy(() =>
  import("@/pages/workflows/schedule-visit-page").then((module) => ({
    default: module.ScheduleVisitPage,
  })),
);
const EmiCalculatorPage = lazy(() =>
  import("@/pages/workflows/emi-calculator-page").then((module) => ({
    default: module.EmiCalculatorPage,
  })),
);
const SavedDashboardPage = lazy(() =>
  import("@/pages/workflows/saved-dashboard-page").then((module) => ({
    default: module.SavedDashboardPage,
  })),
);

const routePaths = ["/map"] as const;

const childRoutes: RouteObject[] = routePaths.map((path) => ({
  path,
  element: <FoundationPage />,
}));

const createRouter = import.meta.env.PROD
  ? createHashRouter
  : createBrowserRouter;

export const router = createRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/properties", element: <PropertyListingPage /> },
      { path: "/compare", element: <ComparePage /> },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: "/enquire/:propertyType/:propertyId", element: <EnquiryPage /> },
      { path: "/schedule-visit", element: <ScheduleVisitPage /> },
      { path: "/emi-calculator", element: <EmiCalculatorPage /> },
      { path: "/saved", element: <SavedDashboardPage /> },
      { path: "/lands", element: <PropertyListingPage /> },
      { path: "/lands/:projectId", element: <LandProjectPage /> },
      { path: "/lands/:projectId/masterplan", element: <LandMasterplanPage /> },
      { path: "/lands/:projectId/plots/:plotId", element: <PlotDetailPage /> },
      {
        path: "/lands/:projectId/plots/:plotId/geography",
        element: <PlotDetailPage />,
      },
      {
        path: "/lands/:projectId/plots/:plotId/dimensions",
        element: <PlotDetailPage />,
      },
      { path: "/lands/:projectId/approvals", element: <LandInformationPage /> },
      { path: "/lands/:projectId/nearby", element: <LandInformationPage /> },
      { path: "/lands/:projectId/pricing", element: <LandInformationPage /> },
      { path: "/apartments", element: <PropertyListingPage /> },
      { path: "/apartments/:projectId", element: <ApartmentProjectPage /> },
      { path: "/apartments/:projectId/towers", element: <TowerSelectorPage /> },
      {
        path: "/apartments/:projectId/towers/:towerId",
        element: <TowerFloorPage />,
      },
      {
        path: "/apartments/:projectId/towers/:towerId/floors",
        element: <TowerFloorPage />,
      },
      {
        path: "/apartments/:projectId/towers/:towerId/floors/:floorId",
        element: <TowerFloorPage />,
      },
      {
        path: "/apartments/:projectId/flats/:flatId",
        element: <FlatDetailPage />,
      },
      {
        path: "/apartments/:projectId/flats/:flatId/floor-plan",
        element: <ResidenceExperiencePage />,
      },
      {
        path: "/apartments/:projectId/flats/:flatId/tour",
        element: <ResidenceExperiencePage />,
      },
      {
        path: "/apartments/:projectId/interiors",
        element: <ApartmentInformationPage />,
      },
      {
        path: "/apartments/:projectId/materials",
        element: <ApartmentInformationPage />,
      },
      {
        path: "/apartments/:projectId/amenities",
        element: <ApartmentInformationPage />,
      },
      {
        path: "/apartments/:projectId/parking",
        element: <ApartmentInformationPage />,
      },
      {
        path: "/apartments/:projectId/security",
        element: <ApartmentInformationPage />,
      },
      {
        path: "/apartments/:projectId/maintenance",
        element: <ApartmentInformationPage />,
      },
      {
        path: "/apartments/:projectId/pricing",
        element: <ApartmentInformationPage />,
      },
      { path: "/houses", element: <PropertyListingPage /> },
      { path: "/houses/:houseId", element: <HousePage /> },
      { path: "/houses/:houseId/floors", element: <HousePage /> },
      { path: "/houses/:houseId/tour", element: <HousePage /> },
      { path: "/villas", element: <PropertyListingPage /> },
      { path: "/villas/:communityId", element: <VillaCommunityPage /> },
      {
        path: "/villas/:communityId/masterplan",
        element: <VillaCommunityPage />,
      },
      {
        path: "/villas/:communityId/amenities",
        element: <VillaCommunityPage />,
      },
      {
        path: "/villas/:communityId/villas/:villaId",
        element: <VillaDetailPage />,
      },
      {
        path: "/villas/:communityId/villas/:villaId/floor-plan",
        element: <VillaExperiencePage />,
      },
      {
        path: "/villas/:communityId/villas/:villaId/tour",
        element: <VillaExperiencePage />,
      },
      ...childRoutes,
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
