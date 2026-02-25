export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await the params promise
  const { id } = await params;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <p>
        Viewing details for user ID: <span className="text-primary">{id}</span>
      </p>
    </div>
  );
}
