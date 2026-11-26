export const mealJournal: {
  date: string;
  dish: string;
  note: string;
  nextTime?: string;
  photo?: { src: string; alt: string };
}[] = [];

export const recipeWishlist: string[] = [];
export const bucketList = ["Try swimming.", "Give calisthenics a try."];
export const sanjiRecipes: { dish: string; page?: number; note?: string }[] = [];

export { watchShelf } from "./watch-shelf";
