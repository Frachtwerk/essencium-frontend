# Changelog

## [7.1.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.1.0...essencium-app-v7.1.1) (2024-05-29)


### Bug Fixes

* move feedbackWidget to footer ([#585](https://github.com/Frachtwerk/essencium-frontend/issues/585)) ([3b771dd](https://github.com/Frachtwerk/essencium-frontend/commit/3b771dd05cac498672f1cb414bc6cd19efc5d2ad))

## [7.1.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.0.1...essencium-app-v7.1.0) (2024-05-29)


### Features

* enable props forwarding for appshell mantine components ([#582](https://github.com/Frachtwerk/essencium-frontend/issues/582)) ([d50ed6e](https://github.com/Frachtwerk/essencium-frontend/commit/d50ed6edb3d86002491975f6e90b202552fb2605))

## [7.0.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v7.0.0...essencium-app-v7.0.1) (2024-05-23)


### Bug Fixes

* adjust z-index for notification ([#568](https://github.com/Frachtwerk/essencium-frontend/issues/568)) ([396114b](https://github.com/Frachtwerk/essencium-frontend/commit/396114b22a21a2d6ee882ca76be14f40159a7838))
* highlight parent navLink on child routes ([6902465](https://github.com/Frachtwerk/essencium-frontend/commit/6902465403790fc54f13cf84569f24171f90257d))
* load all users for filter ([#578](https://github.com/Frachtwerk/essencium-frontend/issues/578)) ([bf89a6e](https://github.com/Frachtwerk/essencium-frontend/commit/bf89a6effeef01fa3ec3452d912abc5b1de68f9a))

## [7.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v6.1.1...essencium-app-v7.0.0) (2024-04-25)


### ⚠ BREAKING CHANGES

* migration to tanstack query 5
* migration to Next 14

### Code Refactoring

* migration to Next 14 ([e11880f](https://github.com/Frachtwerk/essencium-frontend/commit/e11880fbba739b61c4b91391edcb52d825c8eedc))
* migration to tanstack query 5 ([6b2f659](https://github.com/Frachtwerk/essencium-frontend/commit/6b2f659cb19a71f3254c665efbfe23013da41bdc))

## [6.1.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v6.1.0...essencium-app-v6.1.1) (2024-03-14)


### Bug Fixes

* construct api url correctly ([01adf28](https://github.com/Frachtwerk/essencium-frontend/commit/01adf28abece4d9d52cf7716b1639d040f4aa0f2))

## [6.1.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v6.0.0...essencium-app-v6.1.0) (2024-03-14)


### Features

* add sso support ([bc9d82b](https://github.com/Frachtwerk/essencium-frontend/commit/bc9d82b28c5ee77bb840d01d388a5f6fbf17f626))

## [6.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v5.0.0...essencium-app-v6.0.0) (2024-02-27)


### ⚠ BREAKING CHANGES

* migration to mantine v7

### Code Refactoring

* migration to mantine v7 ([b140cf8](https://github.com/Frachtwerk/essencium-frontend/commit/b140cf8c7428e43d314ff3e459b9d0f72352eef5))

## [5.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v4.1.3...essencium-app-v5.0.0) (2024-02-06)


### ⚠ BREAKING CHANGES

* change role object of user to list of role objects ([#505](https://github.com/Frachtwerk/essencium-frontend/issues/505))

### Features

* add feedback widget ([e55062d](https://github.com/Frachtwerk/essencium-frontend/commit/e55062dc55051f3e188b2e118b9fdf4a1f59b71f))
* add language setup test for other tests ([#481](https://github.com/Frachtwerk/essencium-frontend/issues/481)) ([c281f49](https://github.com/Frachtwerk/essencium-frontend/commit/c281f496ec78be991c7d06e57b74aea2707ae759))
* add pnpm v8 support ([c01d9d0](https://github.com/Frachtwerk/essencium-frontend/commit/c01d9d09890eb512c7de933ce417e636ccb68b07))


### Bug Fixes

* set inital state of foldedNav to true ([#470](https://github.com/Frachtwerk/essencium-frontend/issues/470)) ([e1f4fa8](https://github.com/Frachtwerk/essencium-frontend/commit/e1f4fa8e8ad97f52695ec3cc58c96550d52e8ff2))


### Code Refactoring

* change role object of user to list of role objects ([#505](https://github.com/Frachtwerk/essencium-frontend/issues/505)) ([8dc8080](https://github.com/Frachtwerk/essencium-frontend/commit/8dc8080c157a6a33d164a809e181b30d8c010cb6))

## [4.1.3](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v4.1.2...essencium-app-v4.1.3) (2024-01-13)


### Bug Fixes

* fix Vercel deployment with lower version of Next.js ([#473](https://github.com/Frachtwerk/essencium-frontend/issues/473)) ([025eacf](https://github.com/Frachtwerk/essencium-frontend/commit/025eacf697bbb3e9b3652ef351c43efe34e1faa8))

## [4.1.2](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v4.1.1...essencium-app-v4.1.2) (2024-01-12)


### Bug Fixes

* fix axios vulnerability ([7130f81](https://github.com/Frachtwerk/essencium-frontend/commit/7130f812b76396ec76a36e9cbcf310a02dc8c5d5))
* fix chaijs vulnerability ([#465](https://github.com/Frachtwerk/essencium-frontend/issues/465)) ([2b36a8f](https://github.com/Frachtwerk/essencium-frontend/commit/2b36a8f10e11e2b9693a3e75cd3fdccc37cff137))
* fix vite vulnerability in package app ([b80f788](https://github.com/Frachtwerk/essencium-frontend/commit/b80f788e436e797ffc94908f673be3baa1dee8fb))
* fix zod vulnerability ([d963ef3](https://github.com/Frachtwerk/essencium-frontend/commit/d963ef3bd8f5a3e74bf868ff3229adde3e0feeee))
* fix next vulnerability ([298b6b8](https://github.com/Frachtwerk/essencium-frontend/commit/298b6b80e1bb9d6c288146d734ee617c6ce97602))
* update nx ([#471](https://github.com/Frachtwerk/essencium-frontend/issues/471)) ([c2de52f](https://github.com/Frachtwerk/essencium-frontend/commit/c2de52f0d6e232a8f0c31788e8c2398d582576a9))

## [4.1.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v4.1.0...essencium-app-v4.1.1) (2023-12-10)


### Bug Fixes

* fix seeding script ([5887bea](https://github.com/Frachtwerk/essencium-frontend/commit/5887bea1bb7d4900087c4e6854fd3862c505ad96))

## [4.1.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v4.0.1...essencium-app-v4.1.0) (2023-12-07)


### Features

* add and edit READMEs ([#453](https://github.com/Frachtwerk/essencium-frontend/issues/453)) ([ace03ca](https://github.com/Frachtwerk/essencium-frontend/commit/ace03cab63e0cfe8a39d0f4322b1ba60b6e225ba))

## [4.0.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v4.0.0...essencium-app-v4.0.1) (2023-12-07)


### Bug Fixes

* wrap app cmp export into appWithTranslation HOC ([a1bbd41](https://github.com/Frachtwerk/essencium-frontend/commit/a1bbd41be292cb32b203f2614e31e6b96fd4f19b))

## [4.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v3.0.0...essencium-app-v4.0.0) (2023-12-07)


### ⚠ BREAKING CHANGES

* put generic logic/cmps into lib and specific into app pkg

### Code Refactoring

* put generic logic/cmps into lib and specific into app pkg ([cf7bdda](https://github.com/Frachtwerk/essencium-frontend/commit/cf7bdda943074ad7631370add1150c69e99114d1))

## [3.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v2.4.1...essencium-app-v3.0.0) (2023-09-21)

### ⚠ BREAKING CHANGES

* move api folder from app into lib

### Features

* add functionality to contact form ([fcc5406](https://github.com/Frachtwerk/essencium-frontend/commit/fcc5406effa4df244953fc2a029ea02da2eee61c))


### Bug Fixes

* set page number to zero when fetching roles ([81b7590](https://github.com/Frachtwerk/essencium-frontend/commit/81b7590dba2f7536fd6c4408e4330920b04c8e55))


### Code Refactoring

* move api folder from app into lib ([2dca446](https://github.com/Frachtwerk/essencium-frontend/commit/2dca446671cafd906c3f026da664dad5037c0392))

## [2.4.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v2.4.0...essencium-app-v2.4.1) (2023-09-20)


### Bug Fixes

* fix layout flickering by using mantine ssr package ([ef70a28](https://github.com/Frachtwerk/essencium-frontend/commit/ef70a28f0484170ffcc3ae363e312b1dd74b3b1d))

## [2.4.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v2.3.1...essencium-app-v2.4.0) (2023-09-18)


### Features

* add eslint config package ([87943a9](https://github.com/Frachtwerk/essencium-frontend/commit/87943a9e7e887d5c964d45b222046a4979362e43))
* persist sidebar state in local storage ([01cea19](https://github.com/Frachtwerk/essencium-frontend/commit/01cea19e68ee08b8f4dac4ce7fbb4b5585e986ed))

## [2.3.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v2.3.0...essencium-app-v2.3.1) (2023-09-12)


### Bug Fixes

* make boolean env var consistent with 0 or 1 ([179d5bf](https://github.com/Frachtwerk/essencium-frontend/commit/179d5bf4cbfc3d4cce1aa7ab4d75130b36ff1ef2))

## [2.3.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v2.2.0...essencium-app-v2.3.0) (2023-09-06)


### Features

* toggle version indicator via env var ([63a43e5](https://github.com/Frachtwerk/essencium-frontend/commit/63a43e59be76633f192e755914ee34116831a2e9))

## [2.2.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v2.1.1...essencium-app-v2.2.0) (2023-08-30)


### Features

* add healthcheck endpoint ([26ef301](https://github.com/Frachtwerk/essencium-frontend/commit/26ef301697a06c53c69858662a746947a323b0f1))

## [2.1.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v2.1.0...essencium-app-v2.1.1) (2023-08-19)


### Bug Fixes

* apply translation updates reactively ([db895e0](https://github.com/Frachtwerk/essencium-frontend/commit/db895e0010f1b29a3248225c8fb7976ccbb941f7))

## [2.1.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v2.0.1...essencium-app-v2.1.0) (2023-08-17)


### Features

* release commit for topbar and sidebar refactoring ([#370](https://github.com/Frachtwerk/essencium-frontend/issues/370)) ([e96dddb](https://github.com/Frachtwerk/essencium-frontend/commit/e96dddb745e59be1b3ecb214cfc10b030e89a472))

## [2.0.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v2.0.0...essencium-app-v2.0.1) (2023-08-02)


### Bug Fixes

* downgrade i18n and its deps for react and next ([7fed0e3](https://github.com/Frachtwerk/essencium-frontend/commit/7fed0e34d5f0f3ac73e9aa9fc66f747e833027b2))

## [2.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v1.2.0...essencium-app-v2.0.0) (2023-08-01)


### ⚠ BREAKING CHANGES

* refactor code to match backend version

### Features

* add basic UI for translations ([7f9cd99](https://github.com/Frachtwerk/essencium-frontend/commit/7f9cd99574af83040810aa791e62b9b497f2db40))
* add button to add role ([379acdc](https://github.com/Frachtwerk/essencium-frontend/commit/379acdc4cc368d16d640070c83a499ef3599187c))
* add edit & delete functionality to rolesView on nextBranch ([3449b89](https://github.com/Frachtwerk/essencium-frontend/commit/3449b899e607c9f62ca9ec0a285e67c86c42711a))
* add end2end tests for views ([31520f8](https://github.com/Frachtwerk/essencium-frontend/commit/31520f89d68e1e9b0909127f57c0202c72b06c38))
* add Essencium logo ([f64b087](https://github.com/Frachtwerk/essencium-frontend/commit/f64b0871e76f144a429463886069bd82f8d04f44))
* add functionality for resetting a user password ([da14f9c](https://github.com/Frachtwerk/essencium-frontend/commit/da14f9ca2f8d8e93ccf0bd0016545aa04c6f95a9))
* add functionality to delete a user ([ea6a7d2](https://github.com/Frachtwerk/essencium-frontend/commit/ea6a7d2f962cfbd899a5bac97ac29002825f44be))
* add functionality to invalidate a user's authToken ([35cfe60](https://github.com/Frachtwerk/essencium-frontend/commit/35cfe60d59da158b72b92f84dcd5d1ba767bd602))
* add functionality to setPassword component ([e08dccf](https://github.com/Frachtwerk/essencium-frontend/commit/e08dccfe5825579e31057a785b41d7cfdff5f084))
* add getUsers query function ([2c8a541](https://github.com/Frachtwerk/essencium-frontend/commit/2c8a541f5bc072e2ccc689ef4d56f938efed71b1))
* add loader animation ([24a598e](https://github.com/Frachtwerk/essencium-frontend/commit/24a598e2673d94b8e56453470bf290709d730f7b))
* add modal logic to roles view ([1aae64e](https://github.com/Frachtwerk/essencium-frontend/commit/1aae64e916f502e5da937d2d1378ce3b88c65251))
* add pagination and table model to roles view ([f99429e](https://github.com/Frachtwerk/essencium-frontend/commit/f99429e9d0ad10aa93da104cdb01d00a65e93720))
* add pagination to rights view ([51403da](https://github.com/Frachtwerk/essencium-frontend/commit/51403dae38cddee01800cb4f4b8a1c1d422845f2))
* add pagination to users view ([dbc1586](https://github.com/Frachtwerk/essencium-frontend/commit/dbc1586bb81547c5e690a512a7c69ea55cdc8f5a))
* add query params to useGetRoles hook ([87a79fb](https://github.com/Frachtwerk/essencium-frontend/commit/87a79fb072c98d86acb1fda15322d1ffb6d5df69))
* add roles route ([ababe28](https://github.com/Frachtwerk/essencium-frontend/commit/ababe2865091c50c6c73b6421c0a083a05bed840))
* add roles view ([4c54911](https://github.com/Frachtwerk/essencium-frontend/commit/4c54911ad7ce8dfdfbd63faa6f4246875d6bb7f9))
* add route and navigation ([9869068](https://github.com/Frachtwerk/essencium-frontend/commit/9869068d6d6610ba0bb5a4c039c638ab58e375f7))
* add searchable drop-down for filtering tables ([22cc447](https://github.com/Frachtwerk/essencium-frontend/commit/22cc4471a2b8e7ab4e457acd0581f9858e20d104))
* add update user page ([b84634c](https://github.com/Frachtwerk/essencium-frontend/commit/b84634c4b264ce9dab4a4f9a4d0e8a1259279e44))
* add useCreateRole hook ([c9503df](https://github.com/Frachtwerk/essencium-frontend/commit/c9503df420adfa3907d23215b815662ceb47547f))
* conditionally show UI elements dependent on user role ([8fd7014](https://github.com/Frachtwerk/essencium-frontend/commit/8fd7014e84e4a9ed195275789cef55d9398912fe))
* create page for adding a new user ([4c1f089](https://github.com/Frachtwerk/essencium-frontend/commit/4c1f089c659ac9c44723ba8b32d22c9d16ff2ec9))
* display translation for locale property ([545eaec](https://github.com/Frachtwerk/essencium-frontend/commit/545eaecddc2bfa971d9670847dfc9b8dd27b1875))
* enable server-side sorting for the existing table views ([b000896](https://github.com/Frachtwerk/essencium-frontend/commit/b0008967f03057eb211a7bc1d8916de40fdebe19))
* add delete confirmation dialog to usersView ([5d6b6f6](https://github.com/Frachtwerk/essencium-frontend/commit/5d6b6f600e8c58d21246595f70438f872061c966))
* implement basic filter functionality for users table ([7bc3a2a](https://github.com/Frachtwerk/essencium-frontend/commit/7bc3a2a2ec2e1a1ed3c9666ab06d02f18b729ace))
* protect routes and render navlinks conditionally ([c6dc83b](https://github.com/Frachtwerk/essencium-frontend/commit/c6dc83b28873063d6799fbaeac853f1ce0d06f6b))
* set dynamic title ([54d154a](https://github.com/Frachtwerk/essencium-frontend/commit/54d154a0c7500c0fc908d453f6b5ca948f491956))
* set user's language to default language ([a88d450](https://github.com/Frachtwerk/essencium-frontend/commit/a88d450ec772c2d15443e5d41b4546c1c0efcdf3))
* updating & resetting existing translations ([36e12f1](https://github.com/Frachtwerk/essencium-frontend/commit/36e12f16b5bf09c80d35a27a8906d6b3c39246b5))
* use user locale if logged in ([63ab9e5](https://github.com/Frachtwerk/essencium-frontend/commit/63ab9e529a209539fb9d222b623b1454aa0f5059))


### Bug Fixes

* add variable to rolesView test ([227c68e](https://github.com/Frachtwerk/essencium-frontend/commit/227c68e3a27d41161fda71628529e5e6ad9f5356))
* adjust e2e test for UsersView ([9e45e1e](https://github.com/Frachtwerk/essencium-frontend/commit/9e45e1e546dab221f23badfdbf4b498efb459b35))
* adjust test ([83bf690](https://github.com/Frachtwerk/essencium-frontend/commit/83bf69045f5df259c370d53b3127a38584280787))
* adjust test for NavBar ([65172af](https://github.com/Frachtwerk/essencium-frontend/commit/65172afdfe197acfd759421c21f2181aeaa8c668))
* adjust test for rolesView ([dd2ee3f](https://github.com/Frachtwerk/essencium-frontend/commit/dd2ee3f43315dac8bc54d1752b980117e31d57dd))
* **app:** remove blocking await keyword ([7c07a8e](https://github.com/Frachtwerk/essencium-frontend/commit/7c07a8ee884c4424f418f85d2d83869f5d617a1d))
* **app:** set user Admin as default user ([b038fb9](https://github.com/Frachtwerk/essencium-frontend/commit/b038fb91b5063e86b45bfa1c74b2fc5edb1c027f))
* change press action to click action in RolesView test ([227c68e](https://github.com/Frachtwerk/essencium-frontend/commit/227c68e3a27d41161fda71628529e5e6ad9f5356))
* fix unresolved language variables ([e042904](https://github.com/Frachtwerk/essencium-frontend/commit/e04290427b693795ac0a579ab0498fb319389409))
* implement changes from merge conflict ([602bc1b](https://github.com/Frachtwerk/essencium-frontend/commit/602bc1b700eb2d8e9bb08187301cfa811eeab5f8))
* linting error ([f0961d6](https://github.com/Frachtwerk/essencium-frontend/commit/f0961d6a9bf430125eed05361c5d436085845a91))
* load german if user locale is english ([b5a16f2](https://github.com/Frachtwerk/essencium-frontend/commit/b5a16f2aae95ad2ba7777029008a33c545872968))
* load german translation ([3045e5f](https://github.com/Frachtwerk/essencium-frontend/commit/3045e5f674cacc0da76315bfa40ee2dee4656342))
* redirect user if user was updated ([6121cf0](https://github.com/Frachtwerk/essencium-frontend/commit/6121cf0764a33d18652d1fc8c36594ebab5014df))
* remove client-side pagination ([48ab76c](https://github.com/Frachtwerk/essencium-frontend/commit/48ab76cc8594408b0a6760513f65b3b8a8fc40e5))
* remove duplicate import ([11957c9](https://github.com/Frachtwerk/essencium-frontend/commit/11957c925eedf58027c2e18929a6dd9ad7aa2914))
* remove only ([227c68e](https://github.com/Frachtwerk/essencium-frontend/commit/227c68e3a27d41161fda71628529e5e6ad9f5356))
* remove request to terminate endpoint in logout function ([f2d698b](https://github.com/Frachtwerk/essencium-frontend/commit/f2d698b010f58c1290d709bfa413889986cee85a))
* replace new Set with filter method ([25c8bf9](https://github.com/Frachtwerk/essencium-frontend/commit/25c8bf93f8daddc118747045e04d07b6b80fc3cd))
* set assertion timeout for RolesView test ([227c68e](https://github.com/Frachtwerk/essencium-frontend/commit/227c68e3a27d41161fda71628529e5e6ad9f5356))
* set correct pageCount value ([d188130](https://github.com/Frachtwerk/essencium-frontend/commit/d188130099432793c07204d3aceedde38bca663c))
* setTimeout in RolesView test ([227c68e](https://github.com/Frachtwerk/essencium-frontend/commit/227c68e3a27d41161fda71628529e5e6ad9f5356))
* solve merge conflicts ([222af22](https://github.com/Frachtwerk/essencium-frontend/commit/222af22d075a4f69a5f7de9d09e7669ce6ea31a4))
* store user in local storage for route guard ([51a0375](https://github.com/Frachtwerk/essencium-frontend/commit/51a0375855238aeeee3662607b2c1619122d4f12))
* use same margins as in other views ([2e086b7](https://github.com/Frachtwerk/essencium-frontend/commit/2e086b7379c713fb04f717f1c87f2a5707977628))


### Code Refactoring

* refactor code to match backend version ([57d47bf](https://github.com/Frachtwerk/essencium-frontend/commit/57d47bf0eac6a3411acd6d35c12852c056b4b94a))

## [1.2.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v1.1.0...essencium-app-v1.2.0) (2023-07-13)


### Features

* add searchable drop-down for filtering tables ([22cc447](https://github.com/Frachtwerk/essencium-frontend/commit/22cc4471a2b8e7ab4e457acd0581f9858e20d104))


### Bug Fixes

* adjust e2e test for UsersView ([9e45e1e](https://github.com/Frachtwerk/essencium-frontend/commit/9e45e1e546dab221f23badfdbf4b498efb459b35))
* replace new Set with filter method ([25c8bf9](https://github.com/Frachtwerk/essencium-frontend/commit/25c8bf93f8daddc118747045e04d07b6b80fc3cd))

## [1.1.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v1.0.1...essencium-app-v1.1.0) (2023-07-07)


### Features

* add functionality to invalidate a user's authToken ([35cfe60](https://github.com/Frachtwerk/essencium-frontend/commit/35cfe60d59da158b72b92f84dcd5d1ba767bd602))

## [1.0.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-app-v1.0.0...essencium-app-v1.0.1) (2023-07-06)


### Bug Fixes

* use same margins as in other views ([2e086b7](https://github.com/Frachtwerk/essencium-frontend/commit/2e086b7379c713fb04f717f1c87f2a5707977628))

## 1.0.0 (2023-07-03)


### Features

* add basic UI for translations ([7f9cd99](https://github.com/Frachtwerk/essencium-frontend/commit/7f9cd99574af83040810aa791e62b9b497f2db40))
* add button to add role ([379acdc](https://github.com/Frachtwerk/essencium-frontend/commit/379acdc4cc368d16d640070c83a499ef3599187c))
* add dynamic columns for role response ([877c91e](https://github.com/Frachtwerk/essencium-frontend/commit/877c91edc025b6d65794760facd709e75bd89fab))
* add end2end tests for views ([31520f8](https://github.com/Frachtwerk/essencium-frontend/commit/31520f89d68e1e9b0909127f57c0202c72b06c38))
* add functionality for resetting a user password ([da14f9c](https://github.com/Frachtwerk/essencium-frontend/commit/da14f9ca2f8d8e93ccf0bd0016545aa04c6f95a9))
* add functionality to delete a user ([ea6a7d2](https://github.com/Frachtwerk/essencium-frontend/commit/ea6a7d2f962cfbd899a5bac97ac29002825f44be))
* add functionality to setPassword component ([e08dccf](https://github.com/Frachtwerk/essencium-frontend/commit/e08dccfe5825579e31057a785b41d7cfdff5f084))
* add functionality to toggle right ([22f7cb9](https://github.com/Frachtwerk/essencium-frontend/commit/22f7cb9c67a2eda5dbb0d9a0fa2743034fcce748))
* add getUsers query function ([2c8a541](https://github.com/Frachtwerk/essencium-frontend/commit/2c8a541f5bc072e2ccc689ef4d56f938efed71b1))
* add loader animation ([24a598e](https://github.com/Frachtwerk/essencium-frontend/commit/24a598e2673d94b8e56453470bf290709d730f7b))
* add modal logic to roles view ([1aae64e](https://github.com/Frachtwerk/essencium-frontend/commit/1aae64e916f502e5da937d2d1378ce3b88c65251))
* add notification for updating state ([3869e64](https://github.com/Frachtwerk/essencium-frontend/commit/3869e640b4cce6ae511e1ec8f4a3069b380c1986))
* add pagination and table model to roles view ([f99429e](https://github.com/Frachtwerk/essencium-frontend/commit/f99429e9d0ad10aa93da104cdb01d00a65e93720))
* add pagination to rights view ([51403da](https://github.com/Frachtwerk/essencium-frontend/commit/51403dae38cddee01800cb4f4b8a1c1d422845f2))
* add pagination to users view ([dbc1586](https://github.com/Frachtwerk/essencium-frontend/commit/dbc1586bb81547c5e690a512a7c69ea55cdc8f5a))
* add query params to useGetRoles hook ([87a79fb](https://github.com/Frachtwerk/essencium-frontend/commit/87a79fb072c98d86acb1fda15322d1ffb6d5df69))
* add roles route ([ababe28](https://github.com/Frachtwerk/essencium-frontend/commit/ababe2865091c50c6c73b6421c0a083a05bed840))
* add roles view ([4c54911](https://github.com/Frachtwerk/essencium-frontend/commit/4c54911ad7ce8dfdfbd63faa6f4246875d6bb7f9))
* add route and navigation ([9869068](https://github.com/Frachtwerk/essencium-frontend/commit/9869068d6d6610ba0bb5a4c039c638ab58e375f7))
* add translations for success and error notifications ([a01ded3](https://github.com/Frachtwerk/essencium-frontend/commit/a01ded353591206ee656bc3c04d3ca4e093d369c))
* add update user page ([b84634c](https://github.com/Frachtwerk/essencium-frontend/commit/b84634c4b264ce9dab4a4f9a4d0e8a1259279e44))
* add useCreateRole hook ([c9503df](https://github.com/Frachtwerk/essencium-frontend/commit/c9503df420adfa3907d23215b815662ceb47547f))
* call terminate endpoint on logout ([3c9ab3e](https://github.com/Frachtwerk/essencium-frontend/commit/3c9ab3ee7c5b6e6972cda50163b5d330b33bd7dd))
* conditionally show UI elements dependent on user role ([8fd7014](https://github.com/Frachtwerk/essencium-frontend/commit/8fd7014e84e4a9ed195275789cef55d9398912fe))
* create page for adding a new user ([4c1f089](https://github.com/Frachtwerk/essencium-frontend/commit/4c1f089c659ac9c44723ba8b32d22c9d16ff2ec9))
* display app version in header ([01dfbfc](https://github.com/Frachtwerk/essencium-frontend/commit/01dfbfc4a53f33a9cf904c83bce846f9e6aa5bf7))
* display translation for locale property ([545eaec](https://github.com/Frachtwerk/essencium-frontend/commit/545eaecddc2bfa971d9670847dfc9b8dd27b1875))
* enable server-side sorting for the existing table views ([b000896](https://github.com/Frachtwerk/essencium-frontend/commit/b0008967f03057eb211a7bc1d8916de40fdebe19))
* implement basic filter functionality for users table ([7bc3a2a](https://github.com/Frachtwerk/essencium-frontend/commit/7bc3a2a2ec2e1a1ed3c9666ab06d02f18b729ace))
* protect routes and render navlinks conditionally ([c6dc83b](https://github.com/Frachtwerk/essencium-frontend/commit/c6dc83b28873063d6799fbaeac853f1ce0d06f6b))
* release dummy feature ([1c1eaff](https://github.com/Frachtwerk/essencium-frontend/commit/1c1eaff5aa6b527fab63eb2ae9c6cf6e9cfc9fa5))
* release dummy feature ([99cc485](https://github.com/Frachtwerk/essencium-frontend/commit/99cc48593ea2f470d0efb1d556d2ff5d4520e701))
* set dynamic title ([54d154a](https://github.com/Frachtwerk/essencium-frontend/commit/54d154a0c7500c0fc908d453f6b5ca948f491956))
* set user's language to default language ([a88d450](https://github.com/Frachtwerk/essencium-frontend/commit/a88d450ec772c2d15443e5d41b4546c1c0efcdf3))
* updating & resetting existing translations ([36e12f1](https://github.com/Frachtwerk/essencium-frontend/commit/36e12f16b5bf09c80d35a27a8906d6b3c39246b5))
* use user locale if logged in ([63ab9e5](https://github.com/Frachtwerk/essencium-frontend/commit/63ab9e529a209539fb9d222b623b1454aa0f5059))


### Bug Fixes

* add variable to rolesView test ([227c68e](https://github.com/Frachtwerk/essencium-frontend/commit/227c68e3a27d41161fda71628529e5e6ad9f5356))
* adjust test ([83bf690](https://github.com/Frachtwerk/essencium-frontend/commit/83bf69045f5df259c370d53b3127a38584280787))
* adjust test for NavBar ([65172af](https://github.com/Frachtwerk/essencium-frontend/commit/65172afdfe197acfd759421c21f2181aeaa8c668))
* adjust test for rolesView ([dd2ee3f](https://github.com/Frachtwerk/essencium-frontend/commit/dd2ee3f43315dac8bc54d1752b980117e31d57dd))
* **app:** remove blocking await keyword ([7c07a8e](https://github.com/Frachtwerk/essencium-frontend/commit/7c07a8ee884c4424f418f85d2d83869f5d617a1d))
* **app:** set user Admin as default user ([b038fb9](https://github.com/Frachtwerk/essencium-frontend/commit/b038fb91b5063e86b45bfa1c74b2fc5edb1c027f))
* change press action to click action in RolesView test ([227c68e](https://github.com/Frachtwerk/essencium-frontend/commit/227c68e3a27d41161fda71628529e5e6ad9f5356))
* fix eslint errors ([5c9c9cc](https://github.com/Frachtwerk/essencium-frontend/commit/5c9c9ccdd05bd18f9a06a8506cbff7dd5a85ba0a))
* fix typo ([fdd2c1a](https://github.com/Frachtwerk/essencium-frontend/commit/fdd2c1aceb7997ad7ec8b7ec367ced1760c053c3))
* fix undefined error ([948ef9f](https://github.com/Frachtwerk/essencium-frontend/commit/948ef9f5c9c04af3e7d23bcb8c0e3544c7972da2))
* fix unresolved language variables ([e042904](https://github.com/Frachtwerk/essencium-frontend/commit/e04290427b693795ac0a579ab0498fb319389409))
* implement changes from merge conflict ([602bc1b](https://github.com/Frachtwerk/essencium-frontend/commit/602bc1b700eb2d8e9bb08187301cfa811eeab5f8))
* linting error ([f0961d6](https://github.com/Frachtwerk/essencium-frontend/commit/f0961d6a9bf430125eed05361c5d436085845a91))
* load german if user locale is english ([b5a16f2](https://github.com/Frachtwerk/essencium-frontend/commit/b5a16f2aae95ad2ba7777029008a33c545872968))
* load german translation ([3045e5f](https://github.com/Frachtwerk/essencium-frontend/commit/3045e5f674cacc0da76315bfa40ee2dee4656342))
* redirect user if user was updated ([6121cf0](https://github.com/Frachtwerk/essencium-frontend/commit/6121cf0764a33d18652d1fc8c36594ebab5014df))
* refetch data after toggling right checkbox ([f94a29c](https://github.com/Frachtwerk/essencium-frontend/commit/f94a29ce657739a76ee2dba2baa9931f8a387554))
* remove client-side pagination ([48ab76c](https://github.com/Frachtwerk/essencium-frontend/commit/48ab76cc8594408b0a6760513f65b3b8a8fc40e5))
* remove duplicate import ([11957c9](https://github.com/Frachtwerk/essencium-frontend/commit/11957c925eedf58027c2e18929a6dd9ad7aa2914))
* remove only ([227c68e](https://github.com/Frachtwerk/essencium-frontend/commit/227c68e3a27d41161fda71628529e5e6ad9f5356))
* remove request to terminate endpoint in logout function ([f2d698b](https://github.com/Frachtwerk/essencium-frontend/commit/f2d698b010f58c1290d709bfa413889986cee85a))
* set assertion timeout for RolesView test ([227c68e](https://github.com/Frachtwerk/essencium-frontend/commit/227c68e3a27d41161fda71628529e5e6ad9f5356))
* set correct pageCount value ([d188130](https://github.com/Frachtwerk/essencium-frontend/commit/d188130099432793c07204d3aceedde38bca663c))
* setTimeout in RolesView test ([227c68e](https://github.com/Frachtwerk/essencium-frontend/commit/227c68e3a27d41161fda71628529e5e6ad9f5356))
* solve merge conflicts ([222af22](https://github.com/Frachtwerk/essencium-frontend/commit/222af22d075a4f69a5f7de9d09e7669ce6ea31a4))
* store user in local storage for route guard ([51a0375](https://github.com/Frachtwerk/essencium-frontend/commit/51a0375855238aeeee3662607b2c1619122d4f12))
