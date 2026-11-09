import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout'
import Home from '@/pages/home'
import NotFound from '@/pages/not-found'
import Project from '@/pages/project'
import Projects from '@/pages/projects'
import Settings from '@/pages/settings'

// Each page is a route. Add a page: write it in src/pages and add its <Route> here.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
