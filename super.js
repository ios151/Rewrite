/*
 * 超级应用锁

[rewrite_local]
^https:\/\/api\.safeapp\.studio\/super-app-lock\/member\/info url script-response-body https://raw.githubusercontent.com/ios151/Rewrite/main/super.js

[mitm]
hostname = api.safeapp.studio
*/
let obj = {
  "code": "0",
  "message": "ok",
  "result": {
    "vipType": 211,
    "vipTypeName": "Lifetime",
    "isExpired": false,
    "expiredIn": 4092595200000
  },
  "requestId": "",
  "success": true
};

$done({ body: JSON.stringify(obj) });
