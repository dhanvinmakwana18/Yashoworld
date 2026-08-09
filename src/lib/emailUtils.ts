/**
 * Smart Email Redirect Handler
 * - On desktop web browsers (Chrome, Edge, Safari), opens Gmail Web Compose directly in a new tab.
 * - On mobile devices (Android / iOS), triggers mailto: to launch the native Gmail or Mail app.
 */
export const openEmailClient = (
  email: string = 'pourfectionbyyashvi@gmail.com',
  subject: string = 'Inquiry for YashoWorld Handcrafted Resin Art',
  body: string = 'Hello YashoWorld team,\n\nI would like to inquire about...'
) => {
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  } else {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  }
};

export interface OrderEmailDetails {
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    category?: string;
    customNote?: string;
  }>;
  subtotal: number;
  discountAmount?: number;
  totalPrice: number;
  customerName?: string;
  customerPhone?: string;
  shippingAddress?: string;
  specialInstructions?: string;
}

export const sendCartOrderEmail = (details: OrderEmailDetails) => {
  const itemListText = details.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}${
          item.customNote ? `\n   Custom Engraving/Notes: ${item.customNote}` : ''
        }`
    )
    .join('\n\n');

  const subject = `[NEW ORDER] YashoWorld Resin Keepsake Order - ₹${details.totalPrice}`;

  const body = `Dear YashoWorld Studio Team,

I would like to place an order for the following handcrafted resin keepsakes:

--- ORDER DETAILS ---
${itemListText}

--- FINANCIAL SUMMARY ---
Subtotal: ₹${details.subtotal}
${details.discountAmount && details.discountAmount > 0 ? `Discount Applied: -₹${details.discountAmount}\n` : ''}Total Estimated Price: ₹${details.totalPrice}

--- CUSTOMER & SHIPPING INFORMATION ---
Name: ${details.customerName || '[Please enter your full name here]'}
Phone / WhatsApp: ${details.customerPhone || '[Please enter your phone number here]'}
Delivery Shipping Address: ${details.shippingAddress || '[Please enter your complete delivery address with PIN code]'}
Special Flower Preservation Notes: ${details.specialInstructions || 'None'}

Please reply with payment instructions (UPI / Bank Transfer) and shipping guidelines for sending my event flowers.

Thank you!
Sent via YashoWorld Studio Direct Order`;

  openEmailClient('pourfectionbyyashvi@gmail.com', subject, body);
};

export interface CustomKeepsakeEmailDetails {
  shape: string;
  size: string;
  baseWood: string;
  memoryItems: string[];
  goldFoil: string;
  engravingText?: string;
  estimatedPrice: number;
  customerName?: string;
  customerPhone?: string;
  shippingAddress?: string;
}

export const sendCustomOrderEmail = (details: CustomKeepsakeEmailDetails) => {
  const subject = `[CUSTOM 3D ORDER] Bespoke Resin Keepsake Quote - ₹${details.estimatedPrice}`;

  const body = `Dear YashoWorld Studio Team,

I have configured a custom 3D resin keepsake on your website and would like to proceed with the order:

--- BESPOKE SPECIFICATIONS ---
• Shape: ${details.shape}
• Dimensions / Size: ${details.size}
• Base Finish: ${details.baseWood}
• Elements to Embed: ${details.memoryItems.length ? details.memoryItems.join(', ') : 'Fresh Event Flowers'}
• Accent Foil: ${details.goldFoil}
• Custom Laser Engraving: ${details.engravingText || 'None'}
• Estimated Price Quote: ₹${details.estimatedPrice}

--- CUSTOMER CONTACT DETAILS ---
Name: ${details.customerName || '[Please enter your full name]'}
Phone / WhatsApp: ${details.customerPhone || '[Please enter your contact number]'}
Shipping Address: ${details.shippingAddress || '[Please enter your address]'}

Please confirm flower packaging instructions and payment link.

Best regards,
Sent via YashoWorld 3D Custom Keepsake Builder`;

  openEmailClient('pourfectionbyyashvi@gmail.com', subject, body);
};

