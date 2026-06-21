// Mandi Price Model - For tracking real-time mandi prices
class MandiPrice {
  static prices = [];
  static id = 1;

  static create(data) {
    const price = {
      id: this.id++,
      variety: data.variety,
      mandi: data.mandi, // Mandi name
      price: data.price,
      unit: data.unit || 'per kg',
      date: data.date || new Date(),
      source: data.source || 'manual',
      trend: data.trend || 'stable', // up, down, stable
      createdAt: new Date(),
    };
    this.prices.push(price);
    return price;
  }

  static findAll() {
    return this.prices;
  }

  static findById(id) {
    return this.prices.find(p => p.id === parseInt(id));
  }

  static findByVariety(variety) {
    return this.prices.filter(p => p.variety.toLowerCase() === variety.toLowerCase());
  }

  static findByMandi(mandi) {
    return this.prices.filter(p => p.mandi.toLowerCase() === mandi.toLowerCase());
  }

  static getLatestPrices() {
    const grouped = {};
    this.prices.forEach(p => {
      const key = `${p.variety}_${p.mandi}`;
      if (!grouped[key] || new Date(p.date) > new Date(grouped[key].date)) {
        grouped[key] = p;
      }
    });
    return Object.values(grouped);
  }

  static update(id, data) {
    const price = this.findById(id);
    if (!price) return null;
    Object.assign(price, data, { id: price.id, createdAt: price.createdAt });
    return price;
  }

  static delete(id) {
    const index = this.prices.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    this.prices.splice(index, 1);
    return true;
  }
}

module.exports = MandiPrice;
