export interface AddressInterface {
  _id: string;
  name?: string;
  details?: string;
  city?: string;
  phone?: string;
}



export interface AddressResponselogged {
  results: number;
  status: string;
  data: [];
}

