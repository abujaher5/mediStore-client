export default function ShopLoading() {
  return (
    <div className="container mx-auto flex flex-col items-center gap-5 lg:px-10">
      <div className="w-full max-w-md h-10 bg-gray-200 animate-pulse rounded-lg" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 w-full">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-72 bg-gray-200 animate-pulse rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
