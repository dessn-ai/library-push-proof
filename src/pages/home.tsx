import { ArrowRight, CheckCircle2, CircleAlert, FolderKanban } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Progress } from '@/components/progress'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { activity, projects } from '@/data/projects'

export default function Home() {
  const open = projects.filter(project => project.status !== 'Done')
  const stats = [
    { label: 'Open projects', value: open.length, icon: FolderKanban },
    { label: 'At risk', value: projects.filter(project => project.status === 'At risk').length, icon: CircleAlert },
    { label: 'Done this quarter', value: projects.filter(project => project.status === 'Done').length, icon: CheckCircle2 },
  ]
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Good morning, Ava</h1>
          <p className="text-sm text-muted-foreground">Here is where your team’s work stands today.</p>
        </div>
        <Button asChild>
          <Link to="/projects">
            All projects <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="gap-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardDescription>{label}</CardDescription>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{value}</CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>In progress</CardTitle>
            <CardDescription>Open projects, by due date.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {open.map(project => (
              <Link key={project.id} to={`/projects/${project.id}`} className="block space-y-2 rounded-md hover:opacity-80">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium">{project.name}</span>
                  <StatusBadge status={project.status} />
                </div>
                <Progress value={project.progress} />
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activity.map(item => (
              <div key={item.what} className="text-sm">
                <p>
                  <span className="font-medium">{item.who}</span> {item.what}
                </p>
                <p className="text-muted-foreground">{item.when}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
