import { Badge } from '@/components/ui/badge'
import type { Status } from '@/data/projects'

const variant: Record<Status, 'default' | 'secondary' | 'outline' | 'destructive'> = { 'On track': 'secondary', 'At risk': 'destructive', Done: 'outline' }

export function StatusBadge({ status }: { status: Status }) {
  return <Badge variant={variant[status]}>{status}</Badge>
}
