import Link from "next/link"

export default function DietProjectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Diet Team Project</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/diet-project/meal-plan" className="p-6 bg-blue-100 rounded-lg hover:bg-blue-200">
          <h2 className="text-xl font-semibold mb-2">Meal Plan</h2>
          <p>View and update your meal plan</p>
        </Link>
        <Link href="/diet-project/missions" className="p-6 bg-green-100 rounded-lg hover:bg-green-200">
          <h2 className="text-xl font-semibold mb-2">Missions</h2>
          <p>Check your personal and team missions</p>
        </Link>
        <Link href="/diet-project/weight-log" className="p-6 bg-yellow-100 rounded-lg hover:bg-yellow-200">
          <h2 className="text-xl font-semibold mb-2">Weight Log</h2>
          <p>Log your daily weight</p>
        </Link>
        <Link href="/diet-project/team-progress" className="p-6 bg-purple-100 rounded-lg hover:bg-purple-200">
          <h2 className="text-xl font-semibold mb-2">Team Progress</h2>
          <p>View overall team progress</p>
        </Link>
      </div>
    </div>
  )
}

