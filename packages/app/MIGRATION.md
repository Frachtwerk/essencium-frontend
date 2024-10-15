# Migrations

## [7.5.0 (15.10.2024)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.4.0...essencium-app-v7.5.0)

### `src/components/layouts/AuthLayout.tsx`

- add support for sub nav items and disable local storage persistence for nav bar folded state

## [7.4.0 (24.09.2024)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.3.0...essencium-app-v7.4.0)

- migration to app router

### `src/pages/_app.tsx`

- indicate selected color theme in dropdown and icon

### `src/pages/login/index.tsx`

- make login form responsive

### `src/app/[locale]/(main)/users/UsersView.tsx`

- refactor filter functionality for table views

### `public/locales/(de|en)/common.json`

- add ability to jump to a specific page

### `src/components/layouts/AuthLayout.tsx`

- move version number and environment info from the navbar to the footer

### `src/pages/users/[id].tsx`

- `UserForm` Component now accepts a new optional prop "rolesEnabledForSsoUser" which is false by default. If set to `true`, the input field for roles in the userForm can be edited for user which are logged in via SSO.

## [7.3.0 (06.08.2024)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.2.0...essencium-app-v7.3.0)

### `src/pages/index.tsx`

- pass function to `Home` component to handle button click

### `src/components/layouts/AuthLayout.tsx`

- `FeedbackWidget` Component now accepts a new prop "additionalInformation" to pass an arbitrary number of key value pairs to the component

## [7.2.0 (12.06.2024)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.1.1...essencium-app-v7.2.0)

### E2E test fixes

- all E2E tests have been fixed and pass now (see those files inside `e2e` folder)

### Add route protector component

- add route protector to only navigate to routes the user has the appropriate rights for, otherwise show an access denied message

### `src/pages/_document.tsx`

- page has been refactored due to Mantine v7 (`@mantine/next` is no longer necessary)

### `src/components/layouts/AuthLayout.tsx`

- clean up
- also list items that do not require rights in spotlight search
- move profile item on top
- replace hard-coded app name with i18n variable

### `src/components/layouts/PublicLayout.tsx`

- replace hard-coded app name with i18n variable

### `public/locales/(de|en)/common.json`

- refactor some translations

### `src/utils/hasRequiredRights.ts`

- extend function to also accepted an array of rights

### `src/pages/users/index.tsx`

- implement roles enum like rights

### `src/api/contact.ts`

- use next-i18next instead of react-i18next

## [7.1.1 (29.05.2024)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.1.0...essencium-app-v7.1.1)

### `src/components/layouts/AuthLayout.tsx`

- use `FeedbackWidget` as child for `Footer`

## [7.1.0 (29.05.2024)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.0.1...essencium-app-v7.1.0)

### `src/components/layouts/AuthLayout.module.css`

- add file

### `src/components/layouts/AuthLayout.tsx`

- add built-in Mantine props forwarding for `AppShell`

## [7.0.1 (23.05.2024)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.0.0...essencium-app-v7.0.1)

### `src/utils/withBaseStylingShowNotification.ts`

- add z-index `100`

### `src/pages/users/index.tsx`

- add api call to load all users for filter data in select

### `src/components/layouts/AuthLayout.tsx`

- Mantines `AppShell` and linked components were refactored
  - use `useDisclosure` to toggle mobile navbar
  - Appshell uses layout concerning to the `useMediaQuery` hook
  - the `NavBar` width is now set in `AppShell`
  - margin is no longer set as prop in `Header`
  - `Header` does not need the `marginLeft` prop anymore
  - `NavBar` does not need the `isOpen` prop anymore
  - The `Box` wrapper in `AppShellMain` is not longer needed

## [7.0.0 (25.04.2024)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v6.1.1...essencium-app-v7.0.0)

### Next.js migration

- Next.js has been updated to latest `14` version
- `i18next`, `react-i18next` & `next-i18next` have also been updated to latest major
- no further adjustments are needed except installing the new versions

### TanStack Query migration

- TanStack Query has been updated to latest `5` version
- the breaking changes that affect the codebase are
  - use `isPending` instead of `isLoading` state for mutations
  - remove `onSuccess` and `onError` properties in `useQuery` and `useMutation` hooks (see [this](https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose) article why) and move error and success message handling to query client initialisation

## [6.1.1 (14.03.2024)](https://github.com/Frachtwerk/essencium-frontend/pull/539/files)

### `.env`

- fix how the API URL is constructed

## [6.1.0 (14.03.2024)](https://github.com/Frachtwerk/essencium-frontend/pull/528/files)

### `.env`

- add new env variable `NEXT_PUBLIC_APP_URL`

### `next.config.js`

- add remote pattern for loading images
- add redirect for oauth login

### `public/locales/de/common.json`

- remove unused translations
- add new translations concerning SSO support

### `public/locales/en/common.json`

- remove unused translations
- add new translations concerning SSO support

### `src/api/auth.ts`

- add boolean states for SSO login
- add `GET` hook for getting SSO applications and corresponding types

### `src/api/roles.ts`

- refactor `useGetRoles` hook to also accept custom query config

### `src/api/me.ts`

- refactor code to prevent cyclic dependencies

### `src/components/layouts/AuthLayout.tsx`

- prettify redirect query to not be inside the URL if redirect is `/`

### `src/pages/login/index.tsx`

- refactor how CSS classes are applied
- add SSO support

### `src/pages/login/Login.module.css`

- add CSS module for login page

### `src/pages/profile/index.tsx`

- add SSO support

### `src/pages/rights/index.tsx`

- refactor how parameters are passed

### `src/pages/roles/index.tsx`

- refactor how parameters are passed

### `src/pages/users/index.tsx`

- refactor how CSS classes are applied
- add SSO support

### `src/pages/users/users.module.css`

- add CSS module for users page

### `src/pages/users/[id].tsx`

- refactor how parameters are passed
- refactor how CSS classes are applied
- add SSO support

### `src/pages/users/add/AddUserView.module.css`

- add CSS file for add user view

### `src/pages/users/add/index.tsx`

- refactor how parameters are passed

### `src/utils/hasRequiredRights.ts`

- accept further data type

## [6.0.0 (27.02.2024)](https://github.com/Frachtwerk/essencium-frontend/pull/496/files)

- [Mantine v7 Changelog](https://mantine.dev/changelog/7-0-0/)

### `postcss.config.cjs`

- new config file for Mantines `postcss-preset-mantine`

### `src/pages/_app.tsx`

- import styles of `@mantine/core` and `@mantine/spotlight`
- change type `ColorScheme` to `MantineColorScheme`
- adjust [`theme` object](https://mantine.dev/theming/theme-object/)
- remove `ColorSchemeProvider` in template
- remove `withGlobalStyles` and `withNormalizeCSS` in `MantineProvider`

### `src/pages/_document.tsx`

- add `ColorSchemeScript` for [usage with next](https://mantine.dev/guides/next/)

### `src/components/layouts/AuthLayout.tsx`

- new structure of the [Appshell](https://mantine.dev/core/app-shell/) and [Spotlight](https://mantine.dev/x/spotlight/)

### `src/pages/rights/index.tsx`

- use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content
- replace `color` with `c` [style prop](https://mantine.dev/styles/style-props/)

### `src/pages/roles/index.tsx`

- use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content
- add `variant` prop for [`Badge`](https://mantine.dev/core/badge/)
- replace `sx` styles with [style props](https://mantine.dev/styles/style-props/)
- add `color` prop for [`ActionIcon`](https://mantine.dev/core/action-icon/)
- replace values in dependency array

### `src/pages/set-password/index.tsx`

- replace `align` with `ta` [style prop](https://mantine.dev/styles/style-props/)

### `src/pages/translations/index.tsx`

- use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content

### `src/pages/users/index.tsx`

- use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content
- replace `sx` styles with [CSS module](https://mantine.dev/styles/css-modules/) styles of `./users.module.css`

### `src/pages/users/users.module.css`

- create [CSS module](https://mantine.dev/styles/css-modules/) styles

### `src/utils/withBaseStylingShowNotification.ts`

- change type `NotificationProps` to `NotificationData`

### `public/locales/de/common.json`

- remove unused languages and add new ones in German

### `public/locales/en/common.json`

- remove unused languages and add new ones in English
