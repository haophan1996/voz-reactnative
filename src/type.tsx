// @types/index.ts

// Define a generic type for routes
type Routes = {
  routeNames: string[];  // You can define this as a list of route names
};

// Define custom navigation props type
export type navigationProps = {
  [x: string]: any;
  navigate: (screen: string, params?: any) => void; // Navigation with optional params
  goBack: () => void; // Go back action
  reset: (index: number, routes: Routes[]) => void; // Reset navigation stack
};


export type RootStackParamList = {
  ScreenHome: undefined; // No params
  ScreenThreads: { itemId: number, appbartitle: string; linksubitem: string }; // Params for SubItem screen
};