function MealCard({ meal }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">
          {meal.strMeal}
        </h2>

        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Category:</span>{" "}
          {meal.strCategory}
        </p>

        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Cuisine:</span>{" "}
          {meal.strArea}
        </p>

        {meal.strTags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {meal.strTags.split(",").map((tag, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MealCard;