import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="space-y-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Button variant="outline" asChild>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  )
}
