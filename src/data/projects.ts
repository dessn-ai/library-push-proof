export type Status = 'On track' | 'At risk' | 'Done'
export type Project = { id: string; name: string; owner: string; status: Status; progress: number; due: string; description: string }

// Sample data for the screens. Replace it with your own, or load it from your API.
export const projects: Project[] = [
  { id: 'website-refresh', name: 'Website refresh', owner: 'Ava Chen', status: 'On track', progress: 72, due: 'Nov 28', description: 'A new home page, pricing page and sign-up flow, with the brand colours from the spring guidelines.' },
  { id: 'mobile-onboarding', name: 'Mobile onboarding', owner: 'Leo Martin', status: 'At risk', progress: 38, due: 'Dec 5', description: 'Three screens that take a new person from install to their first saved item in under a minute.' },
  { id: 'billing-v2', name: 'Billing v2', owner: 'Maya Patel', status: 'On track', progress: 55, due: 'Dec 12', description: 'Plans, invoices and a self-serve upgrade. Card details stay with the payment provider.' },
  { id: 'help-center', name: 'Help center', owner: 'Sam Rivera', status: 'Done', progress: 100, due: 'Oct 30', description: 'Searchable articles with the twenty most asked questions answered.' },
  { id: 'team-invites', name: 'Team invites', owner: 'Noah Kim', status: 'On track', progress: 20, due: 'Jan 9', description: 'Invite by link or email, with roles for admins, editors and viewers.' },
]

export const activity = [
  { who: 'Maya Patel', what: 'moved Billing v2 to review', when: '12 min ago' },
  { who: 'Ava Chen', what: 'shared the pricing page draft', when: '1 hour ago' },
  { who: 'Leo Martin', what: 'flagged Mobile onboarding as at risk', when: '3 hours ago' },
  { who: 'Sam Rivera', what: 'closed Help center', when: 'Yesterday' },
]
