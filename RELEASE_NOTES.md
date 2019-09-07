## 1.2.1 (2019-09-07)

- [#e0777b9](https://github.com/Alex-Werner/SBTree/commit/e0777b925e8512f6d34748095acfedf842852090) - fix(query): correctly implicit $and on multi-field query

## 1.2.0 (2019-09-07)

- [#d2cc62f](https://github.com/Alex-Werner/SBTree/commit/d2cc62f8a65faf4cac46aa9ab3d00d800a091d4e) - improvement: refactorate + fix SBFNode issues on $gt, $lte
- [#46b1dbf](https://github.com/Alex-Werner/SBTree/commit/46b1dbf631655b521884135dade772f7a5144e45) - feature(find): added $in, $nin support
- [#b59ad84](https://github.com/Alex-Werner/SBTree/commit/b59ad843e438a64507479149aa9059ba677553c0) - chore: FSLockJS bumped to 1.3 

## 1.1.0 (2019-09-06)

- [#9c7b008](https://github.com/Alex-Werner/SBTree/commit/9c7b008eb17c7cf68e460eba0c92759daf1931eb) - PR #2 - Added $lt, $lte, $gte, $gt
- [#59b264f](https://github.com/Alex-Werner/SBTree/commit/59b264fd6201b17f3ce0ef8da99f0b886f2eab55) - Added $ne operator
- [#c25dd91](https://github.com/Alex-Werner/SBTree/commit/c25dd91601019afeceac6fc7dd09906b190ebd67) - Added operators logic ($eq)
- [#1e8ea78](https://github.com/Alex-Werner/SBTree/commit/1e8ea78776eaddc94f6c7e9972b2315896c8056c) - Wrote next step specifications

## 1.0.0 (2019-09-03)

- [#8327df9](https://github.com/Alex-Werner/SBTree/commit/8327df9eb268ccb4d8fc4fcfae18a44ea0fc9361) - Perf benchmark within travis/mocha
- [#1a0941b](https://github.com/Alex-Werner/SBTree/commit/1a0941b5caa06b3bc705db6bdf4b8a5d055e6670) - FSAdapter load/save
- [#55f1de0](https://github.com/Alex-Werner/SBTree/commit/55f1de059076f8b93557a12a20a1c136fc0b565d) -  Queue system + locking for FSAdapter (see [FSLockJS](https://github.com/Alex-Werner/FSLockJS))
- FS Adapter + In Memory Adapter
- Allow document to not contains all field
- Allow documents to not contains _id
- Basic Tree structure + One tree per Field
- Basic documentation + tests
