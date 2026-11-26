import Image from "next/image";
import { mealJournal, recipeWishlist, sanjiRecipes } from "@/data/interests";

export const metadata = { title: "Cooking journal" };
export default function CookingPage() {
  return <div className="folio interest-journal"><h1>Cooking journal</h1>
      <p>I’m learning to cook and keeping notes on the meals I make and what I’d change next time. My recipe wishlist includes dishes from Sanji’s cookbook.</p>
      <h3>Meals I’ve made</h3>
      {mealJournal.length ? mealJournal.map(meal => <article key={meal.date + meal.dish}>
        <h4>{meal.dish}</h4><time dateTime={meal.date}>{meal.date}</time>
        {meal.photo && <Image src={meal.photo.src} alt={meal.photo.alt} width={540} height={400} />}
        <p>{meal.note}</p>{meal.nextTime && <p>Next time: {meal.nextTime}</p>}
      </article>) : <p className="journal-empty">[First meal · date · photo · one thing to try next time]</p>}
      <div className="journal-pair"><div><h3>Recipes to try</h3>
        {recipeWishlist.length ? <ul>{recipeWishlist.map(dish => <li key={dish}>{dish}</li>)}</ul> : <p className="journal-empty">[First recipe on my wishlist]</p>}
      </div><div><h3>Sanji’s cookbook</h3>
        <p><a href="https://shop.viz.com/collections/one-piece-manga/products/one-piece-pirate-recipes"><cite>One Piece: Pirate Recipes</cite></a></p>
        {sanjiRecipes.length ? <ul>{sanjiRecipes.map(recipe => <li key={recipe.dish}>{recipe.dish}{recipe.page != null && ` (p. ${recipe.page})`}{recipe.note && `: ${recipe.note}`}</li>)}</ul> : <p className="journal-empty">[First dish to try from the book]</p>}
      </div></div>
  </div>;
}
