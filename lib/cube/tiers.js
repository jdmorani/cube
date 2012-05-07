var tiers = module.exports = {};

var second = 1000,
    second10 = 10 * second,
    minute = 60 * second,
    minute5 = 5 * minute,
    hour = 60 * minute,
    day = 24 * hour,
    week = 7 * day,
    month = 4 * week,
    year = 12 * month,
    all = -1;

tiers[second10] = {
  key: second10,
  floor: function(d) { return new Date(Math.floor(d / second10) * second10); },
  ceil: tier_ceil,
  step: function(d) { return new Date(+d + second10); }
};

tiers[minute] = {
  key: minute,
  floor: function(d) { return new Date(Math.floor(d / minute) * minute); },
  ceil: tier_ceil,
  step: function(d) { return new Date(+d + minute); }
};

tiers[minute5] = {
  key: minute5,
  floor: function(d) { return new Date(Math.floor(d / minute5) * minute5); },
  ceil: tier_ceil,
  step: function(d) { return new Date(+d + minute5); }
};

tiers[hour] = {
  key: hour,
  floor: function(d) { return new Date(Math.floor(d / hour) * hour); },
  ceil: tier_ceil,
  step: function(d) { return new Date(+d + hour); },
  next: tiers[minute5],
  size: function() { return 12; }
};

tiers[day] = {
  key: day,
  floor: function(d) { return new Date(Math.floor(d / day) * day); },
  ceil: tier_ceil,
  step: function(d) { return new Date(+d + day); },
  next: tiers[hour],
  size: function() { return 24; }
};

tiers[week] = {
  key: week,
  floor: function(d) { return new Date(Math.floor(d / week) * week); },
  ceil: tier_ceil,
  step: function(d) { return new Date(+d + week); },
  next: tiers[day],
  size: function() { return 7; }
};

tiers[month] = {
  key: month,
  floor: function(d) { return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)); },
  ceil: tier_ceil,
  step: function(d) { (d = new Date(d)).setUTCMonth(d.getUTCMonth() + 1); return d; },
  next: tiers[day],
  size: function(d) { return 32 - new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 32)).getUTCDate(); }
};

tiers[year] = {
  key: year,
  floor: function(d) { return new Date(Date.UTC(d.getUTCFullYear(), 0, 1)); },
  ceil: tier_ceil,
  step: function(d) { (d = new Date(d)).setUTCFullYear(d.getUTCFullYear() + 1); return d; },
};

tiers[all] = {
  key: all,
  floor: function(d) { return new Date(Date.UTC(2001, 0, 1)); },
  ceil: tier_ceil,
  step: function(d) { return new Date(); },
};



function tier_ceil(date) {
  return this.step(this.floor(new Date(date - 1)));
}
