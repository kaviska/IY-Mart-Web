import { StockPriceType } from "@/types/type";

export default function calculatePrice(stocks: StockPriceType[]): string {
  // Filter stocks with quantity greater than 0
  const validStocks = stocks.filter(
    (stock: StockPriceType) => stock.quantity > 0
  );

  if (validStocks.length === 0) {
    return "No valid stocks available";
  }
  //if stock has only one item then return the price of that item
  if (validStocks.length === 1) {
    return `${validStocks[0].web_price}`;
  }

  // Extract web prices from valid stocks
  const webPrices = validStocks.map((stock: StockPriceType) => stock.web_price);

  // Find the minimum and maximum web prices
  const minPrice = Math.min(...webPrices);
  const maxPrice = Math.max(...webPrices);

  // Return the price range or single price
  return minPrice === maxPrice ? `${minPrice}` : `${minPrice}-${maxPrice}`;
}

