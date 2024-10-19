// 'use client'
import React from 'react'
import { Bell, ChevronDown, LayoutDashboard, Users, FileText, Settings, Video, Activity, Coffee, Moon, Sun, AlertTriangle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
// import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts'
import Link from 'next/link';
import Patient from './Patient'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'




export default async function CriticalLinkDashboard() {
  const {getUser}=getKindeServerSession();
  const user = await getUser();
  // const isAdmin = user?.email === process.env.ADMIN_EMAIL
  console.log(user?.email)
  
  // Mock data
  const doctorInfo = {
    name: "Dr. Jane Smith",
    specialty: "Critical Care Specialist",
    rating: 4.8,
    patientsMonitored: 25,
    efficiency: 92
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']


  const icuUsageData = [
    { name: 'Occupied', value: 75 },
    { name: 'Available', value: 25 },
  ]

  const costSavingsData = [
    { name: 'Traditional ICU', cost: 10000 },
    { name: 'CriticalLink ICU', cost: 1000 },
  ]


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">CriticalLink</h2>
        </div>
        <nav className="mt-6">
          {[
            { icon: LayoutDashboard, label: "Dashboard" },
            { icon: Users, label: "Patients" },
            { icon: FileText, label: "Reports" },
            { icon: Video, label: "Live Monitoring" },
            { icon: Settings, label: "Settings" },
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm text-black">
          <div className="flex items-center justify-between px-6 py-4">
            <div className='justify-center items-center space-x-1'>
              <Link href={`/dashboard/${user?.id}`}><Button variant="" size="">Profile</Button></Link>
              <Button variant="" size="">Doctors</Button>
              <Button variant="" size="">Nurses</Button>
              <Button variant="" size="">Realtime Monitor</Button>
              <Button variant="" size="">..upcoming</Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={doctorInfo.name} />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex items-center">
                <span className="mr-2 text-sm font-medium">{doctorInfo.name}</span>
                <span className="text-gray-500">{user?.email}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Doctor Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Doctor Profile</CardTitle>
              <CardDescription>{doctorInfo.specialty}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt={doctorInfo.name} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{doctorInfo.name}</h3>
                  <p className="text-sm text-gray-500">{doctorInfo.specialty}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Rating</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-yellow-500"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{doctorInfo.rating}</div>
                    <p className="text-xs text-gray-500">Out of 5</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Patients Monitored</CardTitle>
                    <Users className="w-4 h-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{doctorInfo.patientsMonitored}</div>
                    <p className="text-xs text-gray-500">Active patients</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
                    <Activity className="w-4 h-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{doctorInfo.efficiency}%</div>
                    <Progress value={doctorInfo.efficiency} className="w-full" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ICU Bed Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[200px]">
                  {/* <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={icuUsageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {icuUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer> */}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cost Savings Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[200px]">
                  {/* <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costSavingsData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="cost" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer> */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient List */}
          <Patient/>
          {/* Live Video Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Live Patient Monitoring</CardTitle>
              <CardDescription>Real-time video feed of selected patient</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <Video className="w-16 h-16 text-gray-400" />
                <span className="ml-2 text-gray-400">Live video feed placeholder</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}