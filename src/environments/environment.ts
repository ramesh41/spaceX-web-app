// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SPACE_X_LAUNCH_MISSION_URL: 'https://api.spaceXdata.com/v3/launches?limit=100',
  SUCCESSFUL_LAUNCHING_STATUS: '&launch_success=',
  SUCCESSFUL_LANDING_STATUS:'&landing_success=',
  LAUNCHING_YEAR: '&launch_year='
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
