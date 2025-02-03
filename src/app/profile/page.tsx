import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();
  return (
    <div className="page">
      <div className="container">
        <h1 className="text-2xl ml-1">Profile Information</h1>
        <section className="p-4 my-2 border-4 bg-sky-200 border-slate-700 rounded-sm">
          <p className="text-xl font-medium ml-1">Name: </p>
          <div className="disabled-field bg-white">{session?.user?.name}</div>
          <p className="text-xl font-medium ml-1">Email: </p>
          <div className="disabled-field bg-white">{session?.user?.email}</div>
        </section>
      </div>
    </div>
  )
}