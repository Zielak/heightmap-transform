const { sin, cos, sqrt, pow, abs, asin } = Math;
const e = 2.71828;
const M = 1 / (2 * sqrt(2) - 2) - 1;

const project = (ϕ, θ) => {
  const x = sin(ϕ) * cos(θ);
  const x2 = pow(x, 2);
  const y = sin(θ);
  const y2 = pow(y, 2);
  let z = sqrt(1 - x2 - y2);

  const a = M * x2 * y2;
  const b = -M * (x2 + y2);
  const c = -z;
  const d = 1 + M;

  let dF;
  do {
    const F = a * pow(z, 4) + b * pow(z, 2) + c * z + d;
    const Fprim = 4 * a * pow(z, 3) + 2 * b * z + c;
    dF = F / Fprim;
    z = z - dF;
  } while (abs(dF) > e);

  return {
    x: z * x,
    y: z * y
  };
};

const inverse = (x, y) => {
  const xx = pow(x, 2);
  const yy = pow(y, 2);
  const z = 1 + M * (1 - xx) * (1 - yy);
  const l = sqrt(xx + yy + pow(z, 2));
  const xb = x / l;
  const yb = y / l;
  return {
    ϕ: asin(xb / cos(asin(yb))),
    θ: asin(yb)
  };
};
