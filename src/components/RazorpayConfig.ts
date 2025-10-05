// Configuration file for Razorpay

export const RAZORPAY_CONFIG = {
  // Replace these with your actual keys from the Razorpay Dashboard
  key_id: "rzp_test_RPihrJSAMsTFJW", // For test environment
  // key_id: 'rzp_live_YOUR_LIVE_KEY_ID', // For production environment
};

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}
