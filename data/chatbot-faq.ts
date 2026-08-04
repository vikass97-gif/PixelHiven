export interface ChatbotAction {
  label: string;
  href: string;
}

export interface ChatbotFaq {
  id: string;
  keywords: string[];
  answer: string;
  action?: ChatbotAction;
}

export const chatbotFaqs: ChatbotFaq[] = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
    answer:
      "Hello! Welcome to PixelHiven. I can help with products, payments, digital delivery, downloads, warranties, refunds, and account questions.",
  },
  {
    id: "delivery",
    keywords: [
      "delivery",
      "receive product",
      "receive my product",
      "digital delivery",
      "when will i receive",
      "how long",
    ],
    answer:
      "Delivery times depend on the product. Please check the delivery information and warranty shown on the product page before purchasing. Some products may be delivered instantly, while others require manual processing.",
    action: {
      label: "Browse products",
      href: "/shop",
    },
  },
  {
    id: "download",
    keywords: [
      "download",
      "download product",
      "download file",
      "where is my product",
      "find my purchase",
      "purchased product",
    ],
    answer:
      "After payment is confirmed, eligible purchases appear in your customer dashboard. Use the Download button next to your purchased product. If the product requires manual delivery, follow the instructions provided with your order.",
    action: {
      label: "Open my dashboard",
      href: "/dashboard",
    },
  },
  {
    id: "payment",
    keywords: [
      "payment",
      "pay",
      "payment method",
      "crypto",
      "cryptocurrency",
      "cryptomus",
      "checkout",
    ],
    answer:
      "PixelHiven uses a secure external checkout provider. The available currencies and payment methods are displayed during checkout. Never send payment information, passwords, or private keys through this chat.",
    action: {
      label: "View my cart",
      href: "/cart",
    },
  },
  {
    id: "payment-pending",
    keywords: [
      "payment pending",
      "order pending",
      "paid but",
      "payment confirmed",
      "payment not confirmed",
    ],
    answer:
      "Payment confirmation may take a short time depending on the network and payment provider. Refresh your dashboard after a few minutes. If the order remains pending, contact support with your order ID and account email. Never send your password or full payment credentials.",
    action: {
      label: "Contact support",
      href: "/contact",
    },
  },
  {
    id: "refund",
    keywords: [
      "refund",
      "money back",
      "cancel purchase",
      "return product",
      "refund policy",
    ],
    answer:
      "Refund eligibility depends on the product status and circumstances. Downloaded, activated, or delivered digital products may have restrictions. Please review the Refund Policy and contact support if you believe your order is eligible.",
    action: {
      label: "Read the Refund Policy",
      href: "/refund",
    },
  },
  {
    id: "warranty",
    keywords: [
      "warranty",
      "guarantee",
      "activation warranty",
      "support period",
      "not working",
      "does not work",
    ],
    answer:
      "Warranty periods vary by product and are shown in the product information. If a delivered product does not work as described, contact support within the stated warranty period and include your order ID and a description of the issue.",
    action: {
      label: "Contact support",
      href: "/contact",
    },
  },
  {
    id: "license-types",
    keywords: [
      "retail",
      "oem",
      "mak",
      "license type",
      "difference between",
      "volume license",
    ],
    answer:
      "Retail, OEM, MAK, and volume licenses can have different activation, transfer, device, and usage conditions. Always review the product description and the publisher's license terms before purchasing. Contact support if you need help choosing a suitable product.",
    action: {
      label: "Read our license guide",
      href: "/blog/how-to-choose-digital-software-license",
    },
  },
  {
    id: "compatibility",
    keywords: [
      "compatible",
      "compatibility",
      "system requirements",
      "windows",
      "mac",
      "macos",
      "device",
      "how many pc",
    ],
    answer:
      "Compatibility and device limits vary by product. Check the product title and description for the supported operating system, version, region, and number of devices before purchasing.",
    action: {
      label: "Browse products",
      href: "/shop",
    },
  },
  {
    id: "activation",
    keywords: [
      "activate",
      "activation",
      "license key",
      "product key",
      "key not working",
      "activation error",
    ],
    answer:
      "Follow the activation instructions delivered with your order. Do not publish or share your complete license key. If activation fails, contact support within the product warranty period with your order ID and the exact error message.",
    action: {
      label: "Contact support",
      href: "/contact",
    },
  },
  {
    id: "account",
    keywords: [
      "account",
      "login",
      "sign in",
      "cannot login",
      "forgot password",
      "password",
    ],
    answer:
      "Use the Sign In page to access your account. If you cannot sign in, verify your email and password carefully. The automated password-reset interface is not available yet, so contact support for account recovery. Never share your password in this chat.",
    action: {
      label: "Go to Sign In",
      href: "/login",
    },
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "support",
      "human",
      "agent",
      "customer service",
      "speak to someone",
      "help me",
    ],
    answer:
      "For order-specific, account, delivery, or activation assistance, contact the PixelHiven support team. Include your order ID and product name, but never send your password, complete license key, banking information, or private keys.",
    action: {
      label: "Contact support",
      href: "/contact",
    },
  },
  {
    id: "security",
    keywords: [
      "safe",
      "secure",
      "security",
      "password secure",
      "payment secure",
      "personal information",
    ],
    answer:
      "PixelHiven uses authenticated accounts and an external payment provider. Never share passwords, complete license keys, private keys, banking information, or API credentials in chat messages.",
    action: {
      label: "Read the Privacy Policy",
      href: "/privacy",
    },
  },
  {
    id: "thanks",
    keywords: ["thank you", "thanks", "thank", "great", "perfect"],
    answer:
      "You're welcome! If you need anything else, ask another question or contact our support team.",
  },
];

export const chatbotQuickReplies = [
  "How does delivery work?",
  "Where are my purchases?",
  "What payment methods are available?",
  "Can I request a refund?",
  "What is the warranty?",
  "Retail vs OEM vs MAK",
];
