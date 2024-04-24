# Migrations

## [x.y.z (DD.MM.YYYY)](#)

- Next.js has been updated to latest `14` version
- `i18next`, `react-i18next` & `next-i18next` have also been updated to latest major
- no further adjustments are needed except installing the new versions
- TanStack Query has been updated to latest `5` version
- the breaking changes that affect the codebase are
  - use `isPending` instead of `isLoading` state
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
