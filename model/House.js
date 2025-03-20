class House {
    constructor(
      houseId = "",
      latitude = 0.0,
      longitude = 0.0,
      address = "",
      description = "",
      bedrooms = 0,
      bathrooms = 2,
      area = 800,
      price = 0,
      ownerId = "wwgtFtJ4LpeqsgECNtn6UTnHFUI3",
      imageUrl = [
        "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      type = "House",
      createTime = "2 weeks",
      isAvailable = true
    ) {
      this.houseId = houseId;
      this.latitude = latitude;
      this.longitude = longitude;
      this.address = address;
      this.description = description;
      this.bedrooms = bedrooms;
      this.bathrooms = bathrooms;
      this.area = area;
      this.price = price;
      this.ownerId = ownerId;
      this.imageUrl = imageUrl;
      this.type = type;
      this.createTime = createTime;
      this.isAvailable = isAvailable;
    }
  
    // Example method to get house details
    getHouseInfo() {
      return `${this.type} at ${this.address}, ${this.bedrooms} beds, ${this.bathrooms} baths, $${this.price}`;
    }
  }
