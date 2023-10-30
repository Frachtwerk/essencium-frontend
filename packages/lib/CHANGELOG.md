# Changelog

## [3.0.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v3.0.1...essencium-lib-v3.0.1) (2023-10-30)


### Miscellaneous Chores

* release 3.0.1 ([6410352](https://github.com/Frachtwerk/essencium-frontend/commit/641035260d6fe070945fde2f348a43db6625e28e))

## [3.0.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v3.0.0...essencium-lib-v3.0.1) (2023-10-10)


### Features

* add loading state to buttons ([b5549da](https://github.com/Frachtwerk/essencium-frontend/commit/b5549da4bd41a8caa7e43427e1aeb2caa5fe169a))
* add routeguard ([f9ceacd](https://github.com/Frachtwerk/essencium-frontend/commit/f9ceacdc5fb8741ba909d620e8ae81154017ce0f))


### Bug Fixes

* **lib:** add loading state ([eed03e2](https://github.com/Frachtwerk/essencium-frontend/commit/eed03e298b23ef6679cd90e325ddd485a93c6dc5))


### Miscellaneous Chores

* release 3.0.1 ([485e08e](https://github.com/Frachtwerk/essencium-frontend/commit/485e08e411130c8e37190755af0f8bac5749c56f))

## [3.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v2.4.0...essencium-lib-v3.0.0) (2023-09-21)


### ⚠ BREAKING CHANGES

* move api folder from app into lib

### Features

* add functionality to contact form ([fcc5406](https://github.com/Frachtwerk/essencium-frontend/commit/fcc5406effa4df244953fc2a029ea02da2eee61c))


### Bug Fixes

* load JSONTree only on client-side to prevent SSR issues ([268af06](https://github.com/Frachtwerk/essencium-frontend/commit/268af0632fd9b08ca084ce6f5968a717a3f30ca5))


### Code Refactoring

* move api folder from app into lib ([2dca446](https://github.com/Frachtwerk/essencium-frontend/commit/2dca446671cafd906c3f026da664dad5037c0392))

## [2.4.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v2.3.0...essencium-lib-v2.4.0) (2023-09-18)


### Features

* add eslint config package ([87943a9](https://github.com/Frachtwerk/essencium-frontend/commit/87943a9e7e887d5c964d45b222046a4979362e43))

## [2.3.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v2.2.2...essencium-lib-v2.3.0) (2023-09-06)


### Features

* toggle version indicator via env var ([63a43e5](https://github.com/Frachtwerk/essencium-frontend/commit/63a43e59be76633f192e755914ee34116831a2e9))


### Bug Fixes

* adjust logic to listen to the 'NEXT_PUBLIC_ENV' variable ([433d8da](https://github.com/Frachtwerk/essencium-frontend/commit/433d8dab7d2239169962e963c50c7367843dc14d))

## [2.2.2](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v2.2.1...essencium-lib-v2.2.2) (2023-08-28)


### Bug Fixes

* release commit for prevent line break when coll. nav bar ([4eb4886](https://github.com/Frachtwerk/essencium-frontend/commit/4eb4886ebf70585a88d71bec298a471e5d491bff))

## [2.2.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v2.2.0...essencium-lib-v2.2.1) (2023-08-19)


### Bug Fixes

* apply translation updates reactively ([db895e0](https://github.com/Frachtwerk/essencium-frontend/commit/db895e0010f1b29a3248225c8fb7976ccbb941f7))
* prefill form with default values ([dc9e089](https://github.com/Frachtwerk/essencium-frontend/commit/dc9e089f148eee155b015b6a4fe33f973ba55b7c))

## [2.2.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v2.1.0...essencium-lib-v2.2.0) (2023-08-17)


### Features

* release commit for topbar and sidebar refactoring ([#370](https://github.com/Frachtwerk/essencium-frontend/issues/370)) ([e96dddb](https://github.com/Frachtwerk/essencium-frontend/commit/e96dddb745e59be1b3ecb214cfc10b030e89a472))

## [2.1.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v2.0.1...essencium-lib-v2.1.0) (2023-08-17)


### Features

* **lib:** set optional functionality firstColSticky ([b68ae1b](https://github.com/Frachtwerk/essencium-frontend/commit/b68ae1b3d852304d08ffbcb06ee16aa838c8896d))

## [2.0.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v2.0.0...essencium-lib-v2.0.1) (2023-08-02)


### Bug Fixes

* downgrade i18n and its deps for react and next ([7fed0e3](https://github.com/Frachtwerk/essencium-frontend/commit/7fed0e34d5f0f3ac73e9aa9fc66f747e833027b2))

## [2.0.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v1.1.0...essencium-lib-v2.0.0) (2023-08-01)


### ⚠ BREAKING CHANGES

* refactor code to match backend version

### Features

* add basic UI for translations ([7f9cd99](https://github.com/Frachtwerk/essencium-frontend/commit/7f9cd99574af83040810aa791e62b9b497f2db40))
* add edit & delete functionality to rolesView on nextBranch ([3449b89](https://github.com/Frachtwerk/essencium-frontend/commit/3449b899e607c9f62ca9ec0a285e67c86c42711a))
* add Essencium logo ([f64b087](https://github.com/Frachtwerk/essencium-frontend/commit/f64b0871e76f144a429463886069bd82f8d04f44))
* add functionality for resetting a user password ([da14f9c](https://github.com/Frachtwerk/essencium-frontend/commit/da14f9ca2f8d8e93ccf0bd0016545aa04c6f95a9))
* add functionality to setPassword component ([e08dccf](https://github.com/Frachtwerk/essencium-frontend/commit/e08dccfe5825579e31057a785b41d7cfdff5f084))
* add input modal for role ([b88da64](https://github.com/Frachtwerk/essencium-frontend/commit/b88da6492060c62b1689869635cdf85256317a86))
* add loader animation ([24a598e](https://github.com/Frachtwerk/essencium-frontend/commit/24a598e2673d94b8e56453470bf290709d730f7b))
* add loading spinner with delay option ([146bcba](https://github.com/Frachtwerk/essencium-frontend/commit/146bcba10b4d321449e9e147fbfb5ddab07de245))
* add roles component ([4488417](https://github.com/Frachtwerk/essencium-frontend/commit/4488417e29831a5856777f644fae6793c8f27f38))
* add search functionality to translation view ([b233016](https://github.com/Frachtwerk/essencium-frontend/commit/b233016c261b452fdb3c643f407885e2c7d8d6d6))
* add searchable drop-down for filtering tables ([22cc447](https://github.com/Frachtwerk/essencium-frontend/commit/22cc4471a2b8e7ab4e457acd0581f9858e20d104))
* add success message to setPassword flow ([0b61e7c](https://github.com/Frachtwerk/essencium-frontend/commit/0b61e7c38d1c4087d06dbd363b8afb40d60b091d))
* add test for setPassword component ([52fea1a](https://github.com/Frachtwerk/essencium-frontend/commit/52fea1a358d0c9d2049deac2ae657390aebc4d13))
* add users component ([079e26c](https://github.com/Frachtwerk/essencium-frontend/commit/079e26c4c67fd74dbe1412c92024c1cf1a118495))
* create page for adding a new user ([4c1f089](https://github.com/Frachtwerk/essencium-frontend/commit/4c1f089c659ac9c44723ba8b32d22c9d16ff2ec9))
* implement basic filter functionality for users table ([7bc3a2a](https://github.com/Frachtwerk/essencium-frontend/commit/7bc3a2a2ec2e1a1ed3c9666ab06d02f18b729ace))
* protect routes and render navlinks conditionally ([c6dc83b](https://github.com/Frachtwerk/essencium-frontend/commit/c6dc83b28873063d6799fbaeac853f1ce0d06f6b))
* set user's language to default language ([a88d450](https://github.com/Frachtwerk/essencium-frontend/commit/a88d450ec772c2d15443e5d41b4546c1c0efcdf3))
* show text if no translations found ([1858f11](https://github.com/Frachtwerk/essencium-frontend/commit/1858f11a40dab400650b7be0f111dc674f268d22))
* updating & resetting existing translations ([36e12f1](https://github.com/Frachtwerk/essencium-frontend/commit/36e12f16b5bf09c80d35a27a8906d6b3c39246b5))
* use user locale if logged in ([63ab9e5](https://github.com/Frachtwerk/essencium-frontend/commit/63ab9e529a209539fb9d222b623b1454aa0f5059))
* visualize formState errors ([e961299](https://github.com/Frachtwerk/essencium-frontend/commit/e96129983d69762931295352ccabbf18e557a8ea))


### Bug Fixes

* add box container for error messages and adjust margins ([a2a7218](https://github.com/Frachtwerk/essencium-frontend/commit/a2a72180753b899462fb07319de6d4154f509772))
* add horizontal scroll to table ([d91b729](https://github.com/Frachtwerk/essencium-frontend/commit/d91b729820a32146ec7f1bdc6b3a7e00e4e49714))
* display error messages of form inputs in add role modal ([96d75ef](https://github.com/Frachtwerk/essencium-frontend/commit/96d75efb39dcc9ea9ce69b22b44e9a8924a3f4e4))
* fix test case description ([f4c323a](https://github.com/Frachtwerk/essencium-frontend/commit/f4c323a2c57748430d7d462e3dabea8c9f95966b))
* implement changes from merge conflict ([602bc1b](https://github.com/Frachtwerk/essencium-frontend/commit/602bc1b700eb2d8e9bb08187301cfa811eeab5f8))
* prefix import ([81eea04](https://github.com/Frachtwerk/essencium-frontend/commit/81eea046a17cfd8132bf057202fb3e9a0e13ecff))
* remove duplicate imports ([a63f6ed](https://github.com/Frachtwerk/essencium-frontend/commit/a63f6edf29764ee92959f9e786c7e5b19e43318e))
* remove unused imports ([7374546](https://github.com/Frachtwerk/essencium-frontend/commit/7374546125a1997858cce5cb5a7c267c2f43f717))
* reset form on close ([3eca9bd](https://github.com/Frachtwerk/essencium-frontend/commit/3eca9bdce9fe6423f839d3dcd76d380158fc1890))
* set filter change callback as optional ([b3cdf9e](https://github.com/Frachtwerk/essencium-frontend/commit/b3cdf9e1fb5e5def8dec0205ad6f1e2fe5986846))
* solve merge conflicts ([222af22](https://github.com/Frachtwerk/essencium-frontend/commit/222af22d075a4f69a5f7de9d09e7669ce6ea31a4))
* type error ([93f88b8](https://github.com/Frachtwerk/essencium-frontend/commit/93f88b84f27cfc7527cb7be2681ea849f4b20d00))
* use correct import ([f5d9380](https://github.com/Frachtwerk/essencium-frontend/commit/f5d9380dab3f8d22bf0739340056336f96d12ec3))
* use i18n to parse form error messages ([ef9795c](https://github.com/Frachtwerk/essencium-frontend/commit/ef9795c0ee723485eed7d9929c1ffc4af5bbc52b))
* use same margins as in other views ([2e086b7](https://github.com/Frachtwerk/essencium-frontend/commit/2e086b7379c713fb04f717f1c87f2a5707977628))


### Code Refactoring

* refactor code to match backend version ([57d47bf](https://github.com/Frachtwerk/essencium-frontend/commit/57d47bf0eac6a3411acd6d35c12852c056b4b94a))

## [1.1.0](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v1.0.1...essencium-lib-v1.1.0) (2023-07-13)


### Features

* add edit & delete functionality to rolesView on nextBranch ([3449b89](https://github.com/Frachtwerk/essencium-frontend/commit/3449b899e607c9f62ca9ec0a285e67c86c42711a))
* add searchable drop-down for filtering tables ([22cc447](https://github.com/Frachtwerk/essencium-frontend/commit/22cc4471a2b8e7ab4e457acd0581f9858e20d104))


### Bug Fixes

* type error ([93f88b8](https://github.com/Frachtwerk/essencium-frontend/commit/93f88b84f27cfc7527cb7be2681ea849f4b20d00))

## [1.0.1](https://github.com/Frachtwerk/essencium-frontend/compare/essencium-lib-v1.0.0...essencium-lib-v1.0.1) (2023-07-06)


### Bug Fixes

* remove unused imports ([7374546](https://github.com/Frachtwerk/essencium-frontend/commit/7374546125a1997858cce5cb5a7c267c2f43f717))
* use same margins as in other views ([2e086b7](https://github.com/Frachtwerk/essencium-frontend/commit/2e086b7379c713fb04f717f1c87f2a5707977628))

## 1.0.0 (2023-07-03)


### Features

* add basic UI for translations ([7f9cd99](https://github.com/Frachtwerk/essencium-frontend/commit/7f9cd99574af83040810aa791e62b9b497f2db40))
* add blue highlight for theme selector when inverted selection active ([bb49bdc](https://github.com/Frachtwerk/essencium-frontend/commit/bb49bdcfb4c541789e8633538d635e2c2d3a5c6f))
* add color indicator for manual theme selection ([d5f7f15](https://github.com/Frachtwerk/essencium-frontend/commit/d5f7f1516dae6ba4cecb7a565612565ee5aa31a5))
* add conditional rendering for settings tab ([ff0b24f](https://github.com/Frachtwerk/essencium-frontend/commit/ff0b24f77a00c556d9b6484c22b0c39cfa4738c2))
* add functionality for resetting a user password ([da14f9c](https://github.com/Frachtwerk/essencium-frontend/commit/da14f9ca2f8d8e93ccf0bd0016545aa04c6f95a9))
* add functionality for setting language ([4773816](https://github.com/Frachtwerk/essencium-frontend/commit/4773816925aba0692ba8ae88f536f9a395a7b9e6))
* add functionality to setPassword component ([e08dccf](https://github.com/Frachtwerk/essencium-frontend/commit/e08dccfe5825579e31057a785b41d7cfdff5f084))
* add input modal for role ([b88da64](https://github.com/Frachtwerk/essencium-frontend/commit/b88da6492060c62b1689869635cdf85256317a86))
* add language dropdown component ([bb03abe](https://github.com/Frachtwerk/essencium-frontend/commit/bb03abeb876dc85f866aee1ba2442954f3329274))
* add loader animation ([24a598e](https://github.com/Frachtwerk/essencium-frontend/commit/24a598e2673d94b8e56453470bf290709d730f7b))
* add loading spinner with delay option ([146bcba](https://github.com/Frachtwerk/essencium-frontend/commit/146bcba10b4d321449e9e147fbfb5ddab07de245))
* add roles component ([4488417](https://github.com/Frachtwerk/essencium-frontend/commit/4488417e29831a5856777f644fae6793c8f27f38))
* add search functionality to translation view ([b233016](https://github.com/Frachtwerk/essencium-frontend/commit/b233016c261b452fdb3c643f407885e2c7d8d6d6))
* add success message to setPassword flow ([0b61e7c](https://github.com/Frachtwerk/essencium-frontend/commit/0b61e7c38d1c4087d06dbd363b8afb40d60b091d))
* add test for setPassword component ([52fea1a](https://github.com/Frachtwerk/essencium-frontend/commit/52fea1a358d0c9d2049deac2ae657390aebc4d13))
* add users component ([079e26c](https://github.com/Frachtwerk/essencium-frontend/commit/079e26c4c67fd74dbe1412c92024c1cf1a118495))
* create page for adding a new user ([4c1f089](https://github.com/Frachtwerk/essencium-frontend/commit/4c1f089c659ac9c44723ba8b32d22c9d16ff2ec9))
* display app version in header ([01dfbfc](https://github.com/Frachtwerk/essencium-frontend/commit/01dfbfc4a53f33a9cf904c83bce846f9e6aa5bf7))
* implement basic filter functionality for users table ([7bc3a2a](https://github.com/Frachtwerk/essencium-frontend/commit/7bc3a2a2ec2e1a1ed3c9666ab06d02f18b729ace))
* protect routes and render navlinks conditionally ([c6dc83b](https://github.com/Frachtwerk/essencium-frontend/commit/c6dc83b28873063d6799fbaeac853f1ce0d06f6b))
* set user's language to default language ([a88d450](https://github.com/Frachtwerk/essencium-frontend/commit/a88d450ec772c2d15443e5d41b4546c1c0efcdf3))
* show development tag if in dev; use code cmp for version ([8cd97bc](https://github.com/Frachtwerk/essencium-frontend/commit/8cd97bc25b041926ced3292abaee6110c1907d7e))
* show text if no translations found ([1858f11](https://github.com/Frachtwerk/essencium-frontend/commit/1858f11a40dab400650b7be0f111dc674f268d22))
* updating & resetting existing translations ([36e12f1](https://github.com/Frachtwerk/essencium-frontend/commit/36e12f16b5bf09c80d35a27a8906d6b3c39246b5))
* use user locale if logged in ([63ab9e5](https://github.com/Frachtwerk/essencium-frontend/commit/63ab9e529a209539fb9d222b623b1454aa0f5059))
* visualize formState errors ([e961299](https://github.com/Frachtwerk/essencium-frontend/commit/e96129983d69762931295352ccabbf18e557a8ea))


### Bug Fixes

* add box container for error messages and adjust margins ([a2a7218](https://github.com/Frachtwerk/essencium-frontend/commit/a2a72180753b899462fb07319de6d4154f509772))
* add horizontal scroll to table ([d91b729](https://github.com/Frachtwerk/essencium-frontend/commit/d91b729820a32146ec7f1bdc6b3a7e00e4e49714))
* display error messages of form inputs in add role modal ([96d75ef](https://github.com/Frachtwerk/essencium-frontend/commit/96d75efb39dcc9ea9ce69b22b44e9a8924a3f4e4))
* fix test case description ([f4c323a](https://github.com/Frachtwerk/essencium-frontend/commit/f4c323a2c57748430d7d462e3dabea8c9f95966b))
* implement changes from merge conflict ([602bc1b](https://github.com/Frachtwerk/essencium-frontend/commit/602bc1b700eb2d8e9bb08187301cfa811eeab5f8))
* move logout button to very bottom ([2eff4bf](https://github.com/Frachtwerk/essencium-frontend/commit/2eff4bf29d427822faf40216f915adec81d5fafe))
* prefix import ([81eea04](https://github.com/Frachtwerk/essencium-frontend/commit/81eea046a17cfd8132bf057202fb3e9a0e13ecff))
* remove duplicate imports ([a63f6ed](https://github.com/Frachtwerk/essencium-frontend/commit/a63f6edf29764ee92959f9e786c7e5b19e43318e))
* reset form on close ([3eca9bd](https://github.com/Frachtwerk/essencium-frontend/commit/3eca9bdce9fe6423f839d3dcd76d380158fc1890))
* set filter change callback as optional ([b3cdf9e](https://github.com/Frachtwerk/essencium-frontend/commit/b3cdf9e1fb5e5def8dec0205ad6f1e2fe5986846))
* solve merge conflicts ([222af22](https://github.com/Frachtwerk/essencium-frontend/commit/222af22d075a4f69a5f7de9d09e7669ce6ea31a4))
* use correct import ([f5d9380](https://github.com/Frachtwerk/essencium-frontend/commit/f5d9380dab3f8d22bf0739340056336f96d12ec3))
* use i18n to parse form error messages ([ef9795c](https://github.com/Frachtwerk/essencium-frontend/commit/ef9795c0ee723485eed7d9929c1ffc4af5bbc52b))
