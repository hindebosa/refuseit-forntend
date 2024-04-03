export interface User {
    name: string;
    surname:string;
    hash:string;
    phone:string;
    email:string;
    birthdaydate?:string
  }

  export interface Product {
  name: string;
     description: string;
     amount: string;
     price: string;
     coordinates: {
      lat:string;
      lng:string;
    }
  }