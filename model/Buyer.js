class Buyer {
    constructor(uid = "", firstName, lastName, email, password, favoriteHouseIds = []) {
      this.uid = uid;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.favoriteHouseIds = favoriteHouseIds;
    }
  
    // Example method to get full name
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
  
 
  