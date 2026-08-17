const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_VERSION = "2024-10";

async function storefrontFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error("Shopify Storefront API error: " + JSON.stringify(json.errors));
  }
  return json.data as T;
}

/** Live price for a single variant, in the store's currency (major units, e.g. rupees). */
export async function getVariantPrice(variantId: string): Promise<number | null> {
  const data = await storefrontFetch<{ node: { price: { amount: string } } | null }>(
    `query GetVariantPrice($id: ID!) {
      node(id: $id) {
        ... on ProductVariant { price { amount } }
      }
    }`,
    { id: variantId }
  );
  const amount = data.node?.price?.amount;
  return amount ? Math.round(parseFloat(amount)) : null;
}

/** Live prices for many variants in one request. Returns a map of variantId -> price. */
export async function getVariantPrices(variantIds: string[]): Promise<Record<string, number>> {
  if (variantIds.length === 0) return {};
  const data = await storefrontFetch<{ nodes: ({ price: { amount: string } } | null)[] }>(
    `query GetVariantPrices($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on ProductVariant { id price { amount } }
      }
    }`,
    { ids: variantIds }
  );
  const result: Record<string, number> = {};
  for (let i = 0; i < variantIds.length; i++) {
    const node = data.nodes[i] as any;
    if (node?.price?.amount) result[variantIds[i]] = Math.round(parseFloat(node.price.amount));
  }
  return result;
}

/**
 * Overlays live Shopify prices onto a list of products, falling back to the
 * static price for any item without Shopify data or if the fetch fails.
 */
export async function withLivePrices<
  T extends { price: number; shopify?: { variantId: string }; sizes?: { price: number; shopify?: { variantId: string } }[] }
>(products: T[]): Promise<T[]> {
  const ids = new Set<string>();
  for (const p of products) {
    if (p.shopify?.variantId) ids.add(p.shopify.variantId);
    for (const s of p.sizes ?? []) {
      if (s.shopify?.variantId) ids.add(s.shopify.variantId);
    }
  }
  if (ids.size === 0) return products;

  let priceMap: Record<string, number> = {};
  try {
    priceMap = await getVariantPrices(Array.from(ids));
  } catch {
    return products;
  }

  return products.map((p) => {
    const live = p.shopify?.variantId ? priceMap[p.shopify.variantId] : undefined;
    const sizes = p.sizes?.map((s) => {
      const liveSize = s.shopify?.variantId ? priceMap[s.shopify.variantId] : undefined;
      return liveSize !== undefined ? { ...s, price: liveSize } : s;
    });
    return { ...p, ...(live !== undefined ? { price: live } : {}), ...(sizes ? { sizes } : {}) };
  });
}

export interface CheckoutLine {
  variantId: string;
  quantity: number;
  /** Custom line-item properties (e.g. selected color) shown on Shopify's cart & checkout pages. */
  attributes?: { key: string; value: string }[];
}

/** Creates a Shopify cart from the given lines and returns the hosted checkout URL. */
export async function createCheckoutUrl(lines: CheckoutLine[], discountCode?: string): Promise<string> {
  const data = await storefrontFetch<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(
    `mutation CreateCart($lines: [CartLineInput!]!, $discountCodes: [String!]) {
      cartCreate(input: { lines: $lines, discountCodes: $discountCodes }) {
        cart { checkoutUrl }
        userErrors { field message }
      }
    }`,
    {
      lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity, attributes: l.attributes })),
      discountCodes: discountCode ? [discountCode] : undefined,
    }
  );

  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join("; "));
  }
  if (!data.cartCreate.cart) {
    throw new Error("Shopify did not return a cart");
  }
  return data.cartCreate.cart.checkoutUrl;
}
