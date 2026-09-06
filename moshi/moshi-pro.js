const NOW = "2024-01-01T00:00:00.000Z";

const entitlement = {
  id: "crack-ent",
  productKey: "pro_lifetime",
  status: "ACTIVE",
  type: "lifetime",
  expiresAt: null,
  isActive: true,
  verifiedAt: NOW
};

const license = {
  id: "crack-lifetime",
  licenseKey: "MOSHI-PRO0-LIFE-TIME",
  status: "ACTIVE",
  productKey: "pro_lifetime",
  expiresAt: null,
  startsAt: NOW,
  autoRenew: false,
  activationId: "crack-act",
  verifiedAt: NOW,
  entitlement: entitlement
};

const BODIES = {
  me: {
    licensePushFanoutEnabled: true,
    licenses: [license],
    entitlements: [entitlement]
  },
  activate: {
    status: "ACTIVE",
    success: true,
    license: license,
    entitlement: entitlement,
    licenses: [license],
    entitlements: [entitlement]
  },
  devices: {
    devices: [],
    activeDevices: 0
  }
};

const url = $request.url;
const data = url.indexOf("/devices") !== -1 ? BODIES.devices
           : url.indexOf("/licenses/activate") !== -1 ? BODIES.activate
           : url.indexOf("/licenses/me") !== -1 ? BODIES.me
           : null;

if (!data) {
  $done({});
} else {
  const body = JSON.stringify(data);
  const headers = { "Content-Type": "application/json" };

  if (typeof $task !== "undefined") {
    $done({ status: "HTTP/1.1 200 OK", headers: headers, body: body });
  } else {
    $done({ response: { status: 200, headers: headers, body: body } });
  }
}
