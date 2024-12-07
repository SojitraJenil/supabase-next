import { supabase } from "@/lib/supabaseClient";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}
interface ProductData {
  user_id: string;
  name: string;
  category: string;
  price: string;
}

export const UserAction = async (formData: SignUpData) => {
  try {
    const { name, email, password } = formData;
    const { data, error } = await supabase
      .from("user")
      .insert([{ name, email, password }]);
    console.log("Data inserted :>> ", data);
    if (error) {
      console.error("Supabase error :>> ", error);
      throw error;
    }
    return { message: "Registration successful!" };
  } catch (error: any) {
    console.error("Error during signup :>> ", error);
    return { message: error.message || "Something went wrong." };
  }
};

export const ProductAction = async (ProductData: ProductData) => {
  try {
    const { user_id, name, category, price } = ProductData;
    const { data, error } = await supabase
      .from("product")
      .insert([{ user_id, name, category, price }]);
    console.log("data product", data);
    if (error) {
      console.error("Supabase error :>> ", error);
      throw error;
    }
    return { message: "Product add successful!" };
  } catch (error: any) {
    console.error("Error during signup :>> ", error);
    return { message: error.message || "Something went wrong." };
  }
};
