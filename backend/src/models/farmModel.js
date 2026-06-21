// Farm Model - For managing farm details
class Farm {
  static farms = [];
  static id = 1;

  static create(data) {
    const farm = {
      id: this.id++,
      name: data.name,
      location: data.location,
      area: data.area, // in acres
      varieties: data.varieties || [],
      createdAt: new Date(),
    };
    this.farms.push(farm);
    return farm;
  }

  static findAll() {
    return this.farms;
  }

  static findById(id) {
    return this.farms.find(farm => farm.id === parseInt(id));
  }

  static update(id, data) {
    const farm = this.findById(id);
    if (!farm) return null;
    Object.assign(farm, data, { id: farm.id, createdAt: farm.createdAt });
    return farm;
  }

  static delete(id) {
    const index = this.farms.findIndex(farm => farm.id === parseInt(id));
    if (index === -1) return false;
    this.farms.splice(index, 1);
    return true;
  }
}

module.exports = Farm;
