import { ArrowLeft, CalendarDays, User } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Progress } from '@/components/progress'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { projects } from '@/data/projects'
import NotFound from '@/pages/not-found'

export default function Project() {
  const { id } = useParams()
  const project = projects.find(candidate => candidate.id === id)
  if (!project) return <NotFound />
  return (
    <div className="max-w-3xl space-y-6">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link to="/projects">
          <ArrowLeft /> Projects
        </Link>
      </Button>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-muted-foreground">{project.description}</p>
      </div>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <User className="size-4" /> {project.owner}
        </span>
        <span className="flex items-center gap-2">
          <CalendarDays className="size-4" /> Due {project.due}
        </span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
          <CardDescription>{project.progress}% complete</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={project.progress} />
        </CardContent>
      </Card>
    </div>
  )
}
