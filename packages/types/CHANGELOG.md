# Changelog

## [5.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v4.1.0...essencium-types-v5.0.0) (2024-04-25)


### ⚠ BREAKING CHANGES

* migration to Next 14

### Code Refactoring

* migration to Next 14 ([e11880f](https://github.com/Frachtwerk/essencium-frontend/commit/e11880fbba739b61c4b91391edcb52d825c8eedc))

## [4.1.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v4.0.0...essencium-types-v4.1.0) (2024-03-14)


### Features

* add sso support ([bc9d82b](https://github.com/Frachtwerk/essencium-frontend/commit/bc9d82b28c5ee77bb840d01d388a5f6fbf17f626))

## [4.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v3.1.1...essencium-types-v4.0.0) (2024-02-06)


### ⚠ BREAKING CHANGES

* change role object of user to list of role objects ([#505](https://github.com/Frachtwerk/essencium-frontend/issues/505))

### Features

* add feedback widget ([e55062d](https://github.com/Frachtwerk/essencium-frontend/commit/e55062dc55051f3e188b2e118b9fdf4a1f59b71f))
* add pnpm v8 support ([c01d9d0](https://github.com/Frachtwerk/essencium-frontend/commit/c01d9d09890eb512c7de933ce417e636ccb68b07))


### Code Refactoring

* change role object of user to list of role objects ([#505](https://github.com/Frachtwerk/essencium-frontend/issues/505)) ([8dc8080](https://github.com/Frachtwerk/essencium-frontend/commit/8dc8080c157a6a33d164a809e181b30d8c010cb6))

## [3.1.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v3.1.0...essencium-types-v3.1.1) (2024-01-12)


### Bug Fixes

* fix zod vulnerability ([d963ef3](https://github.com/Frachtwerk/essencium-frontend/commit/d963ef3bd8f5a3e74bf868ff3229adde3e0feeee))
* fix next vulnerability ([298b6b8](https://github.com/Frachtwerk/essencium-frontend/commit/298b6b80e1bb9d6c288146d734ee617c6ce97602))
* update nx ([#471](https://github.com/Frachtwerk/essencium-frontend/issues/471)) ([c2de52f](https://github.com/Frachtwerk/essencium-frontend/commit/c2de52f0d6e232a8f0c31788e8c2398d582576a9))

## [3.1.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v3.0.0...essencium-types-v3.1.0) (2023-12-07)


### Features

* add and edit READMEs ([#453](https://github.com/Frachtwerk/essencium-frontend/issues/453)) ([ace03ca](https://github.com/Frachtwerk/essencium-frontend/commit/ace03cab63e0cfe8a39d0f4322b1ba60b6e225ba))

## [3.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v2.1.1...essencium-types-v3.0.0) (2023-12-07)


### ⚠ BREAKING CHANGES

* put generic logic/cmps into lib and specific into app pkg

### Code Refactoring

* put generic logic/cmps into lib and specific into app pkg ([cf7bdda](https://github.com/Frachtwerk/essencium-frontend/commit/cf7bdda943074ad7631370add1150c69e99114d1))

## [2.1.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v2.1.0...essencium-types-v2.1.1) (2023-09-19)


### Bug Fixes

* accept UUIDs for id beside number ([227aea0](https://github.com/Frachtwerk/essencium-frontend/commit/227aea04af4d62a893e176c00378193b3ad74ad6))

## [2.1.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v2.0.1...essencium-types-v2.1.0) (2023-09-18)


### Features

* add eslint config package ([87943a9](https://github.com/Frachtwerk/essencium-frontend/commit/87943a9e7e887d5c964d45b222046a4979362e43))

## [2.0.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v2.0.0...essencium-types-v2.0.1) (2023-08-02)


### Bug Fixes

* intentional change to publish new version ([e3c5285](https://github.com/Frachtwerk/essencium-frontend/commit/e3c52854551ec4e2ffe1a4059208e3574f6db8ca))

## [2.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v1.0.1...essencium-types-v2.0.0) (2023-08-02)


### ⚠ BREAKING CHANGES

* refactor code to match backend version

### Features

* add edit & delete functionality to rolesView on nextBranch ([3449b89](https://github.com/Frachtwerk/essencium-frontend/commit/3449b899e607c9f62ca9ec0a285e67c86c42711a))


### Bug Fixes

* use same margins as in other views ([2e086b7](https://github.com/Frachtwerk/essencium-frontend/commit/2e086b7379c713fb04f717f1c87f2a5707977628))


### Code Refactoring

* refactor code to match backend version ([57d47bf](https://github.com/Frachtwerk/essencium-frontend/commit/57d47bf0eac6a3411acd6d35c12852c056b4b94a))

## [1.0.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v2.0.0...essencium-types-v1.0.1) (2023-08-02)


### ⚠ BREAKING CHANGES

* refactor code to match backend version

### Features

* add edit & delete functionality to rolesView on nextBranch ([3449b89](https://github.com/Frachtwerk/essencium-frontend/commit/3449b899e607c9f62ca9ec0a285e67c86c42711a))
* add functionality for resetting a user password ([da14f9c](https://github.com/Frachtwerk/essencium-frontend/commit/da14f9ca2f8d8e93ccf0bd0016545aa04c6f95a9))
* add functionality to setPassword component ([e08dccf](https://github.com/Frachtwerk/essencium-frontend/commit/e08dccfe5825579e31057a785b41d7cfdff5f084))
* create page for adding a new user ([4c1f089](https://github.com/Frachtwerk/essencium-frontend/commit/4c1f089c659ac9c44723ba8b32d22c9d16ff2ec9))
* export new test type ([482c142](https://github.com/Frachtwerk/essencium-frontend/commit/482c1422b309486a754c2b5bff0cc4bb8ec307e6))
* protect routes and render navlinks conditionally ([c6dc83b](https://github.com/Frachtwerk/essencium-frontend/commit/c6dc83b28873063d6799fbaeac853f1ce0d06f6b))


### Bug Fixes

* add test type to test release process ([9a9d1e0](https://github.com/Frachtwerk/essencium-frontend/commit/9a9d1e00626846d846f3fc6abe1a713b9b660a0f))
* display error messages of form inputs in add role modal ([96d75ef](https://github.com/Frachtwerk/essencium-frontend/commit/96d75efb39dcc9ea9ce69b22b44e9a8924a3f4e4))
* remove test commit ([86a26eb](https://github.com/Frachtwerk/essencium-frontend/commit/86a26ebc16a12b35cb6fe5b8be0f2e73daf957e8))
* test release process (test commit) ([482c142](https://github.com/Frachtwerk/essencium-frontend/commit/482c1422b309486a754c2b5bff0cc4bb8ec307e6))
* use same margins as in other views ([2e086b7](https://github.com/Frachtwerk/essencium-frontend/commit/2e086b7379c713fb04f717f1c87f2a5707977628))


### Code Refactoring

* refactor code to match backend version ([57d47bf](https://github.com/Frachtwerk/essencium-frontend/commit/57d47bf0eac6a3411acd6d35c12852c056b4b94a))

## [2.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v1.1.0...essencium-types-v2.0.0) (2023-08-01)


### ⚠ BREAKING CHANGES

* refactor code to match backend version

### Features

* add edit & delete functionality to rolesView on nextBranch ([3449b89](https://github.com/Frachtwerk/essencium-frontend/commit/3449b899e607c9f62ca9ec0a285e67c86c42711a))
* add functionality for resetting a user password ([da14f9c](https://github.com/Frachtwerk/essencium-frontend/commit/da14f9ca2f8d8e93ccf0bd0016545aa04c6f95a9))
* add functionality to setPassword component ([e08dccf](https://github.com/Frachtwerk/essencium-frontend/commit/e08dccfe5825579e31057a785b41d7cfdff5f084))
* create page for adding a new user ([4c1f089](https://github.com/Frachtwerk/essencium-frontend/commit/4c1f089c659ac9c44723ba8b32d22c9d16ff2ec9))
* export new test type ([482c142](https://github.com/Frachtwerk/essencium-frontend/commit/482c1422b309486a754c2b5bff0cc4bb8ec307e6))
* protect routes and render navlinks conditionally ([c6dc83b](https://github.com/Frachtwerk/essencium-frontend/commit/c6dc83b28873063d6799fbaeac853f1ce0d06f6b))


### Bug Fixes

* add test type to test release process ([9a9d1e0](https://github.com/Frachtwerk/essencium-frontend/commit/9a9d1e00626846d846f3fc6abe1a713b9b660a0f))
* display error messages of form inputs in add role modal ([96d75ef](https://github.com/Frachtwerk/essencium-frontend/commit/96d75efb39dcc9ea9ce69b22b44e9a8924a3f4e4))
* remove test commit ([86a26eb](https://github.com/Frachtwerk/essencium-frontend/commit/86a26ebc16a12b35cb6fe5b8be0f2e73daf957e8))
* test release process (test commit) ([482c142](https://github.com/Frachtwerk/essencium-frontend/commit/482c1422b309486a754c2b5bff0cc4bb8ec307e6))
* use same margins as in other views ([2e086b7](https://github.com/Frachtwerk/essencium-frontend/commit/2e086b7379c713fb04f717f1c87f2a5707977628))


### Code Refactoring

* refactor code to match backend version ([57d47bf](https://github.com/Frachtwerk/essencium-frontend/commit/57d47bf0eac6a3411acd6d35c12852c056b4b94a))

## [1.1.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v1.0.2...essencium-types-v1.1.0) (2023-07-13)


### Features

* add edit & delete functionality to rolesView on nextBranch ([3449b89](https://github.com/Frachtwerk/essencium-frontend/commit/3449b899e607c9f62ca9ec0a285e67c86c42711a))

## [1.0.2](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v1.0.1...essencium-types-v1.0.2) (2023-07-06)


### Bug Fixes

* use same margins as in other views ([2e086b7](https://github.com/Frachtwerk/essencium-frontend/commit/2e086b7379c713fb04f717f1c87f2a5707977628))

## [1.0.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-types-v1.0.0...essencium-types-v1.0.1) (2023-07-04)


### Features

* export new test type ([482c142](https://github.com/Frachtwerk/essencium-frontend/commit/482c1422b309486a754c2b5bff0cc4bb8ec307e6))


### Bug Fixes

* add test type to test release process ([9a9d1e0](https://github.com/Frachtwerk/essencium-frontend/commit/9a9d1e00626846d846f3fc6abe1a713b9b660a0f))
* remove test commit ([86a26eb](https://github.com/Frachtwerk/essencium-frontend/commit/86a26ebc16a12b35cb6fe5b8be0f2e73daf957e8))
* test release process (test commit) ([482c142](https://github.com/Frachtwerk/essencium-frontend/commit/482c1422b309486a754c2b5bff0cc4bb8ec307e6))

## 1.0.0 (2023-07-03)


### Features

* add functionality for resetting a user password ([da14f9c](https://github.com/Frachtwerk/essencium-frontend/commit/da14f9ca2f8d8e93ccf0bd0016545aa04c6f95a9))
* add functionality to setPassword component ([e08dccf](https://github.com/Frachtwerk/essencium-frontend/commit/e08dccfe5825579e31057a785b41d7cfdff5f084))
* add functionality to toggle right ([22f7cb9](https://github.com/Frachtwerk/essencium-frontend/commit/22f7cb9c67a2eda5dbb0d9a0fa2743034fcce748))
* create page for adding a new user ([4c1f089](https://github.com/Frachtwerk/essencium-frontend/commit/4c1f089c659ac9c44723ba8b32d22c9d16ff2ec9))
* protect routes and render navlinks conditionally ([c6dc83b](https://github.com/Frachtwerk/essencium-frontend/commit/c6dc83b28873063d6799fbaeac853f1ce0d06f6b))


### Bug Fixes

* display error messages of form inputs in add role modal ([96d75ef](https://github.com/Frachtwerk/essencium-frontend/commit/96d75efb39dcc9ea9ce69b22b44e9a8924a3f4e4))
