// Sales Model - For managing sales transactions
class Sales {
  static sales = [];
  static id = 1;

  static create(data) {
    const sale = {
      id: this.id++,
      farmId: data.farmId,
      variety: data.variety,
      quantity: data.quantity, // in kg
      pricePerUnit: data.pricePerUnit,
      totalPrice: data.quantity * data.pricePerUnit,
      buyer: data.buyer,
      saleDate: data.saleDate || new Date(),
      mandi: data.mandi,
      notes: data.notes || '',
      createdAt: new Date(),
    };
    this.sales.push(sale);
    return sale;
  }

  static findAll() {
    return this.sales;
  }

  static findById(id) {
    return this.sales.find(s => s.id === parseInt(id));
  }

  static findByFarmId(farmId) {
    return this.sales.filter(s => s.farmId === parseInt(farmId));
  }

  static update(id, data) {
    const sale = this.findById(id);
    if (!sale) return null;
    if (data.quantity || data.pricePerUnit) {
      sale.totalPrice = (data.quantity || sale.quantity) * (data.pricePerUnit || sale.pricePerUnit);
    }
    Object.assign(sale, data, { id: sale.id, createdAt: sale.createdAt });
    return sale;
  }

  static delete(id) {
    const index = this.sales.findIndex(s => s.id === parseInt(id));
    if (index === -1) return false;
    this.sales.splice(index, 1);
    return true;
  }
}

module.exports = Sales;
