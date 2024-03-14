# Migrations

## x.y.z (DD.MM.YYYY)

### `.env`

- add new env variable

```diff
+ NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### `next.config.js`

- add remote pattern for loading images
- add redirect for oauth login

```diff
+  images: {
+    remotePatterns: [
+      {
+        protocol: 'https',
+        hostname: '**.frachtwerk.de',
+        port: '',
+      },
+    ],
+  },
...
+      {
+        source: '/oauth2/:path*',
+        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/:path*`,
+      },
```

### `public/locales/de/common.json`

- remove unused translations
- add new translations concerning SSO support

```diff
-        },
-        "settings": {
-          "title": "Einstellungen",
-          "content": {
-            "status": "Status",
-            "role": "Rolle",
-            "saveSettings": "Einstellungen speichern"
-          }
...
   "loginView": {
     "title": "Anmeldung",
+    "sso": {
+      "or": "oder"
+    },
     "form": {
       "email": "E-Mail",
       "password": "Passwort",
```

### `public/locales/en/common.json`

- remove unused translations
- add new translations concerning SSO support

```diff
-        },
-        "settings": {
-          "title": "Settings",
-          "content": {
-            "status": "Status",
-            "role": "Role",
-            "saveSettings": "Save Settings"
-          }
...
   "loginView": {
     "title": "Login",
+    "sso": {
+      "or": "or"
+    },
     "form": {
       "email": "E-Mail",
       "password": "Password",
```

### `src/api/auth.ts`

- add boolean state for SSO login
- add `GET` hook for getting SSO applications and corresponding types

```diff
+ export const isSsoAtom = atomWithStorage<boolean | null>('isSso', null)
+
+ type SsoApplications = {
+   [key: string]: {
+     imageUrl: string
+     name: string
+     url: string
+   }
+ }
+
+ export function useGetSsoApplications(): UseQueryResult<SsoApplications> {
+   return useQuery({
+     queryKey: ['useGetSsoApplications'],
+     queryFn: () =>
+       api
+         .get<SsoApplications>('/auth/oauth-registrations', {
+           baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
+         })
+         .then(response => response.data),
+   })
+ }
```

### `src/api/roles.ts`

- refactor `useGetRoles` hook to also accept custom query config

```diff
- export type GetRolesParams = {
-   page: RolesResponse['number']
-   size: RolesResponse['size']
-   sort?: string
- }
...
+ export type UseGetRolesParams = {
+  requestConfig?: {
+    page: RolesResponse['number']
+    size: RolesResponse['size']
+    sort?: string
+  }
+  queryConfig?: QueryObserverOptions
+ }
...
-   page,
-   size,
-   sort,
- }: GetRolesParams): UseQueryResult<RolesResponse, AxiosError> {
+  requestConfig,
+  queryConfig,
+ }: UseGetRolesParams): UseQueryResult<RolesResponse, AxiosError> {
   const authToken = useAtomValue(authTokenAtom)

+  const isDisabled = queryConfig?.enabled === false
+
+  const { page, size, sort } = requestConfig || {}
...
  return useQuery<RolesResponse, AxiosError>({
-    enabled: Boolean(authToken),
+    enabled: Boolean(authToken) && !isDisabled,
```

### `src/components/layouts/AuthLayout.tsx`

- prettify redirect query to not be inside the URL if redirect is `/`

```diff
-        query: { redirect: router.asPath },
+        query: router.asPath === '/' ? null : { redirect: router.asPath },
```

### `src/pages/login/index.tsx`

- add support for SSO login

```diff
+ const OAUTH_REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/login`
...
+  const { data: ssoApplications } = useGetSsoApplications()
+
+  const hasSsoApplications = ssoApplications && Object.keys(ssoApplications)
+
+  const oauthToken = searchParams.get('token')
+
+  const setAuthToken = useSetAtom(authTokenAtom)
+
+  const setIsSsoAtom = useSetAtom(isSsoAtom)
+
+  useEffect(() => {
+    if (oauthToken) {
+      setAuthToken(oauthToken)
+      setIsSsoAtom(true)
+
+      router.push(searchParams.get('redirect') || '/')
+    }
+  }, [oauthToken, router, searchParams, setAuthToken, setIsSsoAtom])
...
-    <Login
-      form={
-        <LoginForm
-          handleLogin={handleLogin}
-          handlePasswordReset={handlePasswordReset}
-          setIsPasswordResetFormOpened={setIsPasswordResetFormOpened}
-          isResetPasswordSent={isResetPasswordSent}
-          isPasswordResetFormOpened={isPasswordResetFormOpened}
-          isResettingPassword={isResettingPassword}
-        />
-      }
-    />
+    <Container mt="150px">
+      {!oauthToken ? (
+        <Card shadow="sm" radius="sm">
+          <Flex direction="column">
+            <Title ta="center" order={2} fw="bold">
+              {t('loginView.title')}
+            </Title>
+
+            {hasSsoApplications ? (
+              <>
+                <Box mt="md">
+                  {Object.keys(ssoApplications).map(application => (
+                    <NextLink
+                      style={{ textDecoration: 'none', color: 'white' }}
+                      key={application}
+                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}${ssoApplications[application].url}?redirect_uri=${OAUTH_REDIRECT_URI}`}
+                    >
+                      <Flex justify="center" align="center" my="sm">
+                        <Button
+                          variant="outline"
+                          fullWidth
+                          leftSection={
+                            <Image
+                              src={ssoApplications[application].imageUrl}
+                              alt={ssoApplications[application].name}
+                              width={45}
+                              height={20}
+                            />
+                          }
+                        >
+                          <Box mx="xs" />
+
+                          <Text>{ssoApplications[application].name}</Text>
+                        </Button>
+                      </Flex>
+                    </NextLink>
+                  ))}
+                </Box>
+
+                <Divider
+                  my="xl"
+                  label={t('loginView.sso.or')}
+                  labelPosition="center"
+                />
+              </>
+            ) : null}
+
+            <LoginForm
+              handleLogin={handleLogin}
+              handlePasswordReset={handlePasswordReset}
+              setIsPasswordResetFormOpened={setIsPasswordResetFormOpened}
+              isResetPasswordSent={isResetPasswordSent}
+              isPasswordResetFormOpened={isPasswordResetFormOpened}
+              isResettingPassword={isResettingPassword}
+            />
+          </Flex>
+        </Card>
+      ) : null}
+    </Container>
```

### `pages/profile/index.tsx`

- utilise `isSso` state to render UI elements conditionally

```diff
+   const isSso = Boolean(useAtomValue(isSsoAtom))
...
-  const { data: rolesRequest } = useGetRoles({ page: 0, size: 9999 })
-
-  const roles = rolesRequest?.content || []
...
       <Profile
+        isSso={isSso}
         user={user}
-        roles={roles}
```

### `pages/rights/index.tsx`

- refactor how parameters are passed

```diff
-    page: 0,
-    size: 9999,
-    sort: 'name,asc',
+    requestConfig: {
+      page: 0,
+      size: 9999,
+      sort: 'name,asc',
+    },
```

### `pages/roles/index.tsx`

- refactor how parameters are passed

```diff
-    page: activePage - 1,
-    size: pageSize,
-    sort: parseSorting(sorting, DEFAULT_SORTING),
+    requestConfig: {
+      page: activePage - 1,
+      size: pageSize,
+      sort: parseSorting(sorting, DEFAULT_SORTING),
+    },
```

### `pages/users/[id].tsx`

- refactor how parameters are passed

```diff
-    page: 0,
-    size: 9999,
+    requestConfig: {
+      page: 0,
+      size: 9999,
+    },
```

### `pages/users/add/index.tsx`

- refactor how parameters are passed

```diff
-    page: 0,
-    size: 9999,
+    requestConfig: {
+      page: 0,
+      size: 9999,
+    },
```

### `utils/hasRequiredRights.ts`

- accept further data type

```diff
-  userRights: string[] | null,
+  userRights: string[] | null | undefined,
```

### `utils/logout.ts`

- remove `isSso` state in local storage on logout

```diff
+   localStorage.removeItem('isSso')
```

## 6.0.0 (27.02.2024)

- [Essencium migration PR](https://github.com/Frachtwerk/essencium-frontend/pull/496/files#top)
- [Mantine v7](https://mantine.dev/changelog/7-0-0/)

### `postcss.config.cjs`

- New config file for Mantines `postcss-preset-mantine`

### `src/pages/_app.tsx`

- Import styles of `@mantine/core` and `@mantine/spotlight`
- Change type `ColorScheme` to `MantineColorScheme`
- Adjust [`theme` object](https://mantine.dev/theming/theme-object/)
- Remove `ColorSchemeProvider` in template
- Remove `withGlobalStyles` and `withNormalizeCSS` in `MantineProvider`

### `src/pages/_document.tsx`

- Add `ColorSchemeScript` for [usage with next](https://mantine.dev/guides/next/)

### `src/components/layouts/AuthLayout.tsx`

- New structure of the [Appshell](https://mantine.dev/core/app-shell/) and [Spotlight](https://mantine.dev/x/spotlight/)

### `src/pages/rights/index.tsx`

- Use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content
- Replace `color` with `c` [style prop](https://mantine.dev/styles/style-props/)

### `src/pages/roles/index.tsx`

- Use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content
- Add `variant` prop for [`Badge`](https://mantine.dev/core/badge/)
- Replace `sx` styles with [style props](https://mantine.dev/styles/style-props/)
- Add `color` prop for [`ActionIcon`](https://mantine.dev/core/action-icon/)
- Replace values in dependency array

### `src/pages/set-password/index.tsx`

- Replace `align` with `ta` [style prop](https://mantine.dev/styles/style-props/)

### `src/pages/translations/index.tsx`

- Use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content

### `src/pages/users/index.tsx`

- Use `inherit` prop of [`Text`](https://mantine.dev/core/text/) for table content
- Replace `sx` styles with [CSS module](https://mantine.dev/styles/css-modules/) styles of `./users.module.css`

### `src/pages/users/users.module.css`

- Create [CSS module](https://mantine.dev/styles/css-modules/) styles

### `src/utils/withBaseStylingShowNotification.ts`

- Change type `NotificationProps` to `NotificationData`

### `public/locales/de/common.json`

- remove unused languages and add new ones in German

```diff
-    "languageDropdown": {
-      "language": {
-        "de": "Deutsch",
-        "en": "Englisch"
+    "profile": {
+      "arialLabel": "Profil ansehen"
+    },
+    "mobile": {
+      "menu": {
+        "ariaLabel": "Navigation öffnen"
```

### `public/locales/en/common.json`

- remove unused languages and add new ones in English

```diff
-    "languageDropdown": {
-      "language": {
-        "de": "German",
-        "en": "English"
+    "profile": {
+      "arialLabel": "View profile"
+    },
+    "mobile": {
+      "menu": {
+        "ariaLabel": "Open navigation"
```
