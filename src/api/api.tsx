import axios from "axios";
import { ProductType } from "@/type/ProductType";// Ensure this path is correct


export const APIHost = "https://devcares.com";

const selectCategory = `${APIHost}/api/products`;
export interface Variation {
  color?: string;
  colorCode?: string;
  colorImage?: string;
  image?: string;
  // Add other properties if needed
}




export const fetchProductsByCategories = async (
    selectedCategories: string,
    isSubCategory: boolean = false,
    offset: number,
    sortValue: string
  ): Promise<any> => {
    try {
      let urlEndpoint: string;
      if (isSubCategory) {
        urlEndpoint = `${APIHost}/api/products/subCategoryProducts`;
      } else {
        urlEndpoint = selectCategory;
      }
  
      const response = await axios.get(`${urlEndpoint}/${selectedCategories}`, {
        params: { offset, sortValue },
      });
  
      // No need to check `response`, Axios throws an error for non-2xx responses
      return response.data;
    } catch (error) {
      // Handle both Axios and generic errors
      if (axios.isAxiosError(error)) {
        console.error('Axios error fetching products by categories:', error.response?.status, error.message);
      } else {
        console.error('Error fetching products by categories:', error);
      }
      throw error;
    }
  };
  

const Login = `${APIHost}/api/user`;
const api = axios.create({
  baseURL: Login,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const post = async (endpoint: string, data: any): Promise<any> => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${endpoint}:`, error);
    throw error;
  }
};

const Registration = `${APIHost}/api/user/register/`;
const API_Registration = axios.create({
  baseURL: Registration,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postRegistration = async (endpoint: string, data: any): Promise<any> => {
  try {
    const response = await API_Registration.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${endpoint}:`, error);
    throw error;
  }
};

const userOrder = `${APIHost}/api/order/byrole`;

export const fetchUserOrders = async (storedToken: string): Promise<any> => {
  try {
    const response = await fetch(userOrder, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const orderPlace = `${APIHost}/api/order`;

export const placeOrder = async (storedToken: string, orderData: any): Promise<any> => {
  try {
    const response = await fetch(orderPlace, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

const getUser = `${APIHost}/api/user/profile`;

export const getUserInformation = async (token: string): Promise<any> => {
  try {
    if (token) {
      const response = await fetch(getUser, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${APIHost}/api/categories/all`);
    return response.data.filter((category: any) => category.parentId === null);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProducts = async (): Promise<ProductType[]> => {
  try {
      const response = await axios.get(`${APIHost}/api/products/clients/all`);

      // Map the API response to ProductType with default values
      return response.data.map((product: any) => ({
          id: product.id || '',
          type: product.type || 'Unknown',
          name: product.name || 'No name',
          gender: product.gender || 'Unspecified',
          category: product.categoryName,
          new: product.new || false,
          sale: product.SaleStatus || false,
          rate: product.rating || 0,
          price: product.price || 0,
          originPrice: product.originPrice || product.price, // Default to price if not available
          brand: product.brand || 'Unknown',
          sold: product.sold || 0,
          quantity: product.quantity || 0,
          quantityPurchase: product.quantityPurchase || 0,
          sizes: product.sizes || [],
          variation: product.variation || [], // Make sure Variation type is handled if needed
          thumbImage: Array<{ images: string[] }>,
          images: product.productImages.length > 0 ? product.productImages[0].images : [],
          description: product.description || 'No description',
          action: product.action || 'None',
          slug: product.slug || 'no-slug'
      }));
  } catch (error) {
      console.error('Error fetching products:', error);
      return []; // Return an empty array in case of error
  }
};


export const sendNotification = async (storedToken: string, notificationData: any): Promise<void> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/notifications/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(notificationData),
      });
  
      if (response.ok) {
        console.log("Notification created successfully");
      } else {
        console.error("Failed to create notification");
      }
    } catch (error) {
      console.error("Error creating notification:", error instanceof Error ? error.message : 'Unknown error');
    }
  };
  
export const fetchNotifications = async (authToken: string): Promise<any> => {
  try {
    const notificationResponse = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/notifications/specific`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const notifications = await notificationResponse.json();
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const registerUserSSO = async (userData: any): Promise<any> => {
  try {
    const response = await fetch(
      "http://localhost:5001/api/user/register/sso",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};
