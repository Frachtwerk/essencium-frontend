# Migrations

## [9.X.X (XXXX-XX-XX)]()

### Upgrade to Zod 4 (https://github.com/Frachtwerk/essencium-frontend/pull/911/files)

- Upgraded Zod to version 4. Please refer to the [Zod 4 migration guide](https://zod.dev/v4/changelog) for detailed information on breaking changes and migration steps.

- Removed `UserUpdate` and `RoleUpdate` because of redundancy with `UserInput` and `RoleInput`. Every instance of `UserUpdate | userUpdateSchema` and `RoleUpdate | roleUpdateSchema` in the codebase has been replaced with `UserInput | userInputSchema` and `RoleInput | roleInputSchema` respectively.

- New global Zod configuration has been added to `packages/types/src/config.ts` to set error messages for common validations. Some translation variables have been changed accordingly.

- `useZodForm` hook in `packages/app/src/hooks/useZodForm.ts` has been removed. Please import `useZodForm` from `essencium-lib` instead.

### Improve Accessibility of Rights View (https://github.com/Frachtwerk/essencium-frontend/pull/867/files)

Added aria-label and simplified code by removing if statement and conditionally disabling the checkbox instead

## [9.4.4 (2025-09-05)](https://github.com/Frachtwerk/essencium-frontend/releases/tag/essencium-app-v9.4.3)

### Fix tailwindcss implementation (https://github.com/Frachtwerk/essencium-frontend/pull/888)

##### `packages/app/src/globals.css`

- completely revamped `globals.css` to work in development as well as in apps using essencium-lib as package

## [9.4.0 (2025-09-03)](https://github.com/Frachtwerk/essencium-frontend/releases/tag/essencium-app-v9.4.0)

### Refactor codebase with tailwind css (https://github.com/Frachtwerk/essencium-frontend/pull/761)

#### Essential Migrations

##### `packages/app/package.json`

- installed packages `tailwindcss`, `postcss`, and `@tailwindcss/postcss`

##### `packages/app/postcss.config.cjs`

- added plugin `@tailwindcss/postcss`

##### `packages/app/src/globals.css`

- added new globals.css file. This css-file extends the globals.css of the lib-package and can include project specific theme and tailwind configurations.

##### `packages/app/src/app/[locale]/layout.tsx`

- added line `import '@/globals.css'`
- removed line `import '@mantine/core/styles.css'`

#### Non-Essential Migrations

All other changes are optional. Tailwindcss and css-modules can coexist without problems.

Changed files are:

- `packages/app/src/app/[locale]/(main)/admin/rights/RightsView.tsx`
- `packages/app/src/app/[locale]/(main)/admin/roles/RolesView.tsx`
- `packages/app/src/app/[locale]/(main)/admin/translations/TranslationsView.tsx`
- `packages/app/src/app/[locale]/(main)/admin/users/UsersView.tsx`
- `packages/app/src/app/[locale]/(main)/admin/users/[id]/UpdateUserView.tsx`
- `packages/app/src/app/[locale]/(main)/admin/users/add/AddUserView.tsx`
- `packages/app/src/app/[locale]/(main)/legal-notice/LegalNoticeView.tsx`
- `packages/app/src/app/[locale]/(main)/privacy-policy/PrivacyPolicyView.tsx`
- `packages/app/src/app/[locale]/(main)/profile/ProfileView.tsx`
- `packages/app/src/app/[locale]/(main)/translations/_components/TranslationsChangeForm.tsx`
- `packages/app/src/app/[locale]/(public)/login/LoginView.tsx`
- `packages/app/src/app/[locale]/(public)/set-password/SetPasswordView.tsx`
- `packages/app/src/components/RouteProtector.tsx`
- `packages/app/src/components/layouts/AuthLayout.tsx`
- `packages/app/src/config/mantine.ts`

Removed files are:

- `packages/app/src/app/[locale]/(main)/admin/translations/TranslationsView.module.css`
- `packages/app/src/app/[locale]/(main)/admin/users/Users.module.css`
- `packages/app/src/app/[locale]/(main)/admin/users/add/AddUserView.module.css`
- `packages/app/src/app/[locale]/(main)/legal-notice/LegalNoticeView.module.css`
- `packages/app/src/app/[locale]/(main)/privacy-policy/PrivacyPolicyView.module.css`
- `packages/app/src/app/[locale]/(main)/profile/Profile.module.css`
- `packages/app/src/app/[locale]/(main)/translations/TranslationsView.module.css`
- `packages/app/src/app/[locale]/(main)/translations/_components/TranslationChangeForm.module.css`
- `packages/app/src/app/[locale]/(public)/login/Login.module.css`
- `packages/app/src/app/[locale]/(public)/set-password/SetPassword.module.css`
- `packages/app/src/components/RouteProtector.module.css`
- `packages/app/src/components/layouts/AuthLayout.module.css`
- `packages/app/src/config/Theme.module.css`

### Improve Accessibility of TranslationsChangeForm (https://github.com/Frachtwerk/essencium-frontend/pull/866)

#### `packages/app/src/app/[locale]/(main)/translations/_components/TranslationsChangeForm.tsx`

- added `aria-label` to all TextInput and ActionButton elements and `aria-hidden` to Icons

#### `packages/app/public/locales/de|en/common.json`

- added translations for `translationsView.form.input|save|delete`

### Improve Accessibility of Table Pagination (https://github.com/Frachtwerk/essencium-frontend/pull/863)

#### `packages/app/public/locales/de|en/common.json`

- added `table.footer.pagination.previous|next|first|last` translations

### Improve Accessibility of UsersView Table (https://github.com/Frachtwerk/essencium-frontend/pull/864)

#### `packages/app/[locale]/(main)/admin/users/UsersView.tsx`

- Changed translation key of header `enabled`
- Added added aria-labels for Icons that indicate the users active status

#### `packages/app/public/locales/de|en/common.json`

- Added additional translations for `usersView.table.active`

### Implement a Skip Link (https://github.com/Frachtwerk/essencium-frontend/pull/861)

#### `packages/app/src/components/layouts/AuthLayout.tsx`

- Added `id="main-content"` to the AppShellMain

#### `packages/app/public/locales/de|en/common.json`

- Added translation for `header.skipToMainContent`

### Fix Accessibility Issues with Table Actions (https://github.com/Frachtwerk/essencium-frontend/pull/859)

#### `packages/app/src/app/[locale]/(main)/admin/users/UsersView.tsx`

- Changed all table actions to improve accessibility

#### `packages/app/src/app/[locale]/(main)/admin/roles/RolesView.tsx`

- Changed all table actions to improve accessibility

#### `packages/app/public/locales/de|en/common.json`

- Added translation keys for `usersView.action` and `rightsView.action` for `edit`, `delete`, and `additonalActions`

### Improve Darkmode Styling of Checkboxes (https://github.com/Frachtwerk/essencium-frontend/pull/850)

#### `packages/app/src/config/Theme.module.css`

- Added new class for disabled checkboxes

#### `packages/app/src/config/mantine.ts`

- Import new class for checkboxes

#### `packages/app/package.json`

- Updated mantine to 8.2.0

### Fix Accessibility Issues SSO login button (https://github.com/Frachtwerk/essencium-frontend/pull/853)

#### `packages/app/src/app/[locale]/(public)/login/LoginView.tsx`

- Changed SSO Login button to render a NextLink as polymorphic button

### Fix Accessibility Issues Add user button

#### `packages/app/src/app/[locale]/(main)/admin/users/UsersView.tsx`

- Changed Add User button to render a NextLink as polymorphic button

### Fix sorting & filtering of user table by name (https://github.com/Frachtwerk/essencium-frontend/pull/875)

#### `src/app/[locale]/(main)/admin/users/UsersView.tsx`

- fix `accessorKey` for column `name` again after the backend now supports both filtering and sorting of users by their `name`-property

## [9.3.0 (2025-06-23)](https://github.com/Frachtwerk/essencium-frontend/releases/tag/essencium-app-v9.3.0)

### Add refresh token logic

#### `packages/app/src/api/auth.ts`

- added renew token api call

#### `packages/app/src/utils/parseJwt.ts`

- added a util function to parse jwt

#### `packages/app/src/hooks/useScheduleTokenRenewal.ts`

- added hook to renew token

#### `packages/app/src/components/layouts/AuthLayout.tsx`

- added call for useScheduleTokenRenewal

## [9.2.0 (2025-06-23)](https://github.com/Frachtwerk/essencium-frontend/releases/tag/essencium-app-v9.2.0)

### Refactor: Simplify code for form inputs

#### `packages/app/src/app/[locale]/(main)/admin/users/[id]/UpdateUserView.tsx`

- removed `formState` prop from UserForm
- removed `isUpdate` prop from UserForm

#### `packages/app/src/app/[locale]/(main)/admin/users/add/AddUserView.tsx`

- removed `formState` prop from UserForm

#### `packages/app/src/app/[locale]/(main)/contact/ContactView.tsx`

- removed `formState` prop from Contact

#### `packages/app/src/app/[locale]/(public)/set-password/SetPassword.module.css`

- removed `height` css attribute

### Fix: load all roles for the roles filter in the users view

#### `/src/app/[locale]/(main)/admin/users/UsersView.tsx`

- replaced `useGetUsers` with `useGetRoles` to load all roles

### Fix: add translation keys for min length of the feedback message

#### `/public/locales/de/common.json` and `/public/locales/en/common.json`

- added translation key `feedbackWidget.passwordWarning`

### Fix: Display of frachtwerk logo on sso buton

#### `/src/app/[locale]/(public)/login/LoginView.tsx`

- renamed props `width` to `w` and `height` to `h`

## [9.1.0 (2025-05-05)](https://github.com/Frachtwerk/essencium-frontend/releases/tag/essencium-app-v9.1.0)

### Feat: add password strength indicator when changing a users password

#### `packages/app/src/app/[locale]/(main)/admin/users/[id]/UpdateUserView.tsx`

- added property `isUpdate` to UserForm to activate the hint that a User's password is being changed

### Feat: add warning when changing a users password

#### `/public/locales/de/common.json` and `/public/locales/en/common.json`

- added translation key `passwordWarning`

## [9.0.1 (2025-04-22)](https://github.com/Frachtwerk/essencium-frontend/releases/tag/essencium-app-v9.0.1)

### Fix sorting of user table by name

#### `src/app/[locale]/(main)/admin/users/UsersView.tsx`

- fix `accessorKey` for column `name`

## [9.0.0 (2025-04-15)](https://github.com/Frachtwerk/essencium-frontend/releases/tag/essencium-app-v9.0.0)

### Fix Consistent Background for Cards

#### `/src/app/[locale]/(main)/admin/users/Users.module.css`

- remove dark mixin in class `userDetailCard`

#### `/src/config/Theme.module.css`

- file added

#### `/src/config/mantine.ts`

- import `Card` and `classes`
- extend `Card` with root className

### Fix Navbar and Pin icon bugs

#### `src/components/layouts/AuthLayout.tsx`

- completely removed effect that sets the `isFolded` value

### Fix Scrollbar Bug

#### `src/components/layouts/AuthLayout.module.css`

- remove class `app-shell`

#### `src/components/layouts/AuthLayout.tsx`

- remove attribute `className` from `AppShell`
- add attribute `padding="lg"` to `AppShell`

## [8.1.1 (08.04.2025)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v8.1.0...essencium-app-v8.1.1)

### Fix Translation

#### `src/api/translation.ts`

- remove authToken as requirement to enable getTranslations request

#### `src/app/[locale]/(main)/admin/translations/TranslationsView`

- accept prop `resources` from page
- add mergeTranslations function
- adjust useEffect logic

#### `src/app/[locale]/(main)/admin/translations/page.tsx`

- hand down resources as prop to TranslationsView

#### `src/app/[locale]/(main)/admin/translations/_components/TranslationsChangeForm.tsx`

- adjust type of currentValue

#### `src/app/[locale]/(public)/layout.tsx`

- add addTranslation logic

#### `src/app/components/layouts/AuthLayout.tsx`

- add addTranslation logic

#### `scr/config/i18n.ts`

- export namespace

#### `app/src/hooks/useAddTranslation.ts`

- add file

#### `app/src/utils/mergeTranslations.ts`

- add file

#### `app/src/utils/mergeTranslations.test.ts`

- add file

## [8.1.0 (27.03.2025)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.10.0...essencium-app-v8.1.0)

### `src/app/[locale]/(main)/contact/ContactView.tsx`

- Inputfields `name` and `mailAdress` have been removed from the contactForm and therefore the values must be set in the sendMessage request.
- `contactPerson` is required as prop for `<Contact/>` with minimum name and phone number.

### `public/locales/(de|en)/common.json`

- add translation variables for `contactView.contactForm.subjectPlaceholder`

### `src/app/[locale]/(main)/profile/ProfileView.tsx`

- refetch user after update

### `src/components/layouts/AuthLayout.tsx`

- update route and refresh router

### `.env`

- add new env variables `DEFAULT_USER_EMAIL` and `NEXT_PUBLIC_DEFAULT_USER_EMAIL`

### `src/app/[locale]/(main)/admin/users/UsersView.tsx`

- check for undeletable default user by using email from env variables `DEFAULT_USER_EMAIL` or `NEXT_PUBLIC_DEFAULT_USER_EMAIL` instead of the default username

### `src/app/api/api.ts`

- adjust redirect when user is unauthorized

## [7.10.0 (23.01.2025)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.9.1...essencium-app-v7.10.0)

### `src/app/[locale]/(main)/HomeView.tsx`

- check for right `USER_READ` and hand down prop `showUsersPageButton` to `Home.tsx`

## [7.9.1 (16.01.2025)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.9.0...essencium-app-v7.9.1)

- `handleRefetch` prop in `TablePagination.tsx` was removed, means all references of `TablePagination.tsx` needs to be adjusted by removing the handler prop

## [7.9.0 (30.12.2024)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.8.0...essencium-app-v7.9.0)

### `src/components/layouts/AuthLayout.tsx`

- set primary color variable for links
- convert fooker links to NavLink type
- extract child routes for spotlight

### `src/app/[locale]/layout.tsx`

- remove ColorSchemeScript

### `src/components/provider/mantineProvider.tsx`

- remove custom color scheme logic

## [7.8.0 (19.12.2024)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.7.0...essencium-app-v7.8.0)

- upgrade next and react with script `npx @next/codemod@canary upgrade latest` from the official [guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- upgrade all mantine packages to latest

### `src/components/provider/queryClientProvider.tsx`

- use type cast for workaround

## [7.7.0 (18.11.2024)](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.5.0...essencium-app-v7.7.0)

- add support for runtime environment variables (See [docs](https://docs.essencium.dev/architecture/runtime-config))
- fix pathname in route protector

### `src/app/[locale]/(main)/rights/RightsView.tsx`

- minor refactoring by importing roles enum from types package

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
