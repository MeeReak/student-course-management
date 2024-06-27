export interface IStudent {
  name: {
    en: string;
    km: string;
  };
  dateOfBirth: Date;
  gender: "Male" | "Female";
  phoneNumber: string;
}

export interface IUpdateStudent {
  name?: {
    en: string;
    km: string;
  };
  dateOfBirth?: Date;
  gender?: "Male" | "Female";
  phoneNumber?: string;
}
