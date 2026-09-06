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
  }
};

const url = $request.url;
const body = url.indexOf("/licenses/activate") !== -1 ? BODIES.activate
           : url.indexOf("/licenses/me") !== -1 ? BODIES.me
           : null;

if (!body) {
  $done({});
} else {
  const DROP = ["content-length", "content-encoding", "content-type"];
  const headers = {};
  const src = $response.headers || {};
  Object.keys(src).forEach(k => {
    if (DROP.indexOf(k.toLowerCase()) === -1) headers[k] = src[k];
  });
  headers["Content-Type"] = "application/json";

  $done({
    status: typeof $task !== "undefined" ? "HTTP/1.1 200 OK" : 200,
    headers: headers,
    body: JSON.stringify(body)
  });
}
