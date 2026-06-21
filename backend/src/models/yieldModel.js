// Yield Model - For tracking yield/production data
class Yield {
  static yields = [];
  static id = 1;

  static create(data) {
    const yieldEntry = {
      id: this.id++,
      farmId: data.farmId,
      variety: data.variety,
      quantity: data.quantity, // in kg or tons
      date: data.date || new Date(),
      season: data.season,
      notes: data.notes || '',
      createdAt: new Date(),
    };
    this.yields.push(yieldEntry);
    return yieldEntry;
  }

  static findAll() {
    return this.yields;
  }

  static findById(id) {
    return this.yields.find(y => y.id === parseInt(id));
  }

  static findByFarmId(farmId) {
    return this.yields.filter(y => y.farmId === parseInt(farmId));
  }

  static update(id, data) {
    const yieldEntry = this.findById(id);
    if (!yieldEntry) return null;
    Object.assign(yieldEntry, data, { id: yieldEntry.id, createdAt: yieldEntry.createdAt });
    return yieldEntry;
  }

  static delete(id) {
    const index = this.yields.findIndex(y => y.id === parseInt(id));
    if (index === -1) return false;
    this.yields.splice(index, 1);
    return true;
  }
}

module.exports = Yield;
