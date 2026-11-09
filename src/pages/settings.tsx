import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

export default function Settings() {
  const [name, setName] = useState('Ava Chen')
  const [email, setEmail] = useState('ava@example.com')
  const [updates, setUpdates] = useState(true)
  const [digest, setDigest] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Your profile and notifications.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>How others see you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={event => { setName(event.target.value); setSaved(false) }} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={event => { setEmail(event.target.value); setSaved(false) }} />
          </div>
        </CardContent>
        <Separator />
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="updates">Product updates</Label>
              <p className="mt-1 text-sm text-muted-foreground">News about features and changes.</p>
            </div>
            <Switch id="updates" checked={updates} onCheckedChange={value => { setUpdates(value); setSaved(false) }} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="digest">Weekly digest</Label>
              <p className="mt-1 text-sm text-muted-foreground">A summary of activity every Monday.</p>
            </div>
            <Switch id="digest" checked={digest} onCheckedChange={value => { setDigest(value); setSaved(false) }} />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-3">
          {saved && <span className="text-sm text-muted-foreground">Saved</span>}
          <Button onClick={() => setSaved(true)}>Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
