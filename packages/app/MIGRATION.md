# Migrations

## x.y.z (DD.MM.YYYY)

- [Essencium migration PR](https://github.com/Frachtwerk/essencium-frontend/pull/496/files#top)
- [Mantine v7](https://mantine.dev/changelog/7-0-0/)

### `packages/app/postcss.config.cjs`

- New config file for Mantines `postcss-preset-mantine`

### `packages/app/src/pages/_app.tsx`

- Import styles of `@mantine/core` and `@mantine/spotlight`
- Change type `ColorScheme` to `MantineColorScheme`
- Adjust [`theme` object](https://mantine.dev/theming/theme-object/)
- Remove `ColorSchemeProvider` in template
- Remove `withGlobalStyles` and `withNormalizeCSS` in `MantineProvider`
 
### `packages/app/src/pages/_document.tsx`

- Add `ColorSchemeScript` for [usage with next](https://mantine.dev/guides/next/)

### `packages/app/src/components/layouts/AuthLayout.tsx`

- New structure of the [Appshell](https://mantine.dev/core/app-shell/) and [Spotlight](https://mantine.dev/x/spotlight/)
 
### `packages/app/src/pages/rights/index.tsx`

- Use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content
- Replace `color` with `c` [style prop](https://mantine.dev/styles/style-props/)
 
### `packages/app/src/pages/roles/index.tsx`

- Use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content
- Add `variant` prop for [`Badge`](https://mantine.dev/core/badge/)
- Replace `sx` styles with [style props](https://mantine.dev/styles/style-props/)
- Add `color` prop for [`ActionIcon`](https://mantine.dev/core/action-icon/)
- Replace values in dependency array
 
### `packages/app/src/pages/set-password/index.tsx`

- Replace `align` with `ta` [style prop](https://mantine.dev/styles/style-props/)
 
### `packages/app/src/pages/translations/index.tsx`

- Use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content
 
### `packages/app/src/pages/users/index.tsx`

- Use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content
- Replace `sx` styles with [CSS module](https://mantine.dev/styles/css-modules/) styles of `./users.module.css`
 
### `packages/app/src/pages/users/users.module.css`

- Create [CSS module](https://mantine.dev/styles/css-modules/) styles
 
### `packages/app/src/utils/withBaseStylingShowNotification.ts`

- Change type `NotificationProps` to `NotificationData`