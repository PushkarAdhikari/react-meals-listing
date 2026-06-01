import { useEffect, useState } from "react";
import MealCard from "./components/MealCard";
import Loader from "./components/Loader";
import { useDebounce } from "./hooks/debounceHook";

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");


  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/meals"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }

        const result = await response.json();
        setMeals(result?.data?.data || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal
      ?.toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg font-medium">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-orange-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <h1 className="text-3xl font-bold text-white text-center">
            🍽️ Meals Listing Interface
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">
              {filteredMeals.length}
            </span>{" "}
            meal(s)
          </p>
        </div>

        {/* Meals Grid */}
        {filteredMeals.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredMeals.map((meal) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-700">
              No meals found
            </h2>
            <p className="text-gray-500 mt-2">
              Try searching with a different keyword.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;