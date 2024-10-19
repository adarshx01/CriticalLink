'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Heart, Activity, Video, Moon, AlertTriangle, Brain, 
  Users, TrendingUp, DollarSign, Smile, Stethoscope, Home,
  Zap, Shield, Clock, Smartphone, Clipboard, HeartPulse
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ZAxis
} from 'recharts'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  const icuPerformanceData = [
    { day: 1, traditional: 70, criticalLink: 85 },
    { day: 2, traditional: 72, criticalLink: 87 },
    { day: 3, traditional: 68, criticalLink: 90 },
    { day: 4, traditional: 75, criticalLink: 92 },
    { day: 5, traditional: 71, criticalLink: 89 },
    { day: 6, traditional: 73, criticalLink: 91 },
    { day: 7, traditional: 69, criticalLink: 93 },
  ]


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Demo requested for:', email)
    setEmail('')
  }

  const marketGrowthData = [
    { year: 2020, value: 100 },
    { year: 2021, value: 150 },
    { year: 2022, value: 220 },
    { year: 2023, value: 310 },
    { year: 2024, value: 450 },
  ]

  const efficiencyData = [
    { name: 'Traditional ICU', value: 30 },
    { name: 'CriticalLink ICU', value: 70 },
  ]

  const patientMetricsData = [
    { time: '00:00', heartRate: 72, breathingRate: 14, oxygenLevel: 98 },
    { time: '04:00', heartRate: 68, breathingRate: 12, oxygenLevel: 97 },
    { time: '08:00', heartRate: 70, breathingRate: 13, oxygenLevel: 98 },
    { time: '12:00', heartRate: 75, breathingRate: 15, oxygenLevel: 99 },
    { time: '16:00', heartRate: 73, breathingRate: 14, oxygenLevel: 98 },
    { time: '20:00', heartRate: 71, breathingRate: 13, oxygenLevel: 97 },
  ]

  const sleepPatternData = [
    { time: '22:00', deepSleep: 0, lightSleep: 0, awake: 100 },
    { time: '23:00', deepSleep: 20, lightSleep: 70, awake: 10 },
    { time: '00:00', deepSleep: 60, lightSleep: 35, awake: 5 },
    { time: '01:00', deepSleep: 80, lightSleep: 15, awake: 5 },
    { time: '02:00', deepSleep: 70, lightSleep: 25, awake: 5 },
    { time: '03:00', deepSleep: 50, lightSleep: 45, awake: 5 },
    { time: '04:00', deepSleep: 30, lightSleep: 60, awake: 10 },
    { time: '05:00', deepSleep: 10, lightSleep: 70, awake: 20 },
    { time: '06:00', deepSleep: 0, lightSleep: 30, awake: 70 },
  ]

  const icuImpactData = [
    { metric: 'Patient Recovery Rate', traditional: 70, criticalLink: 85 },
    { metric: 'Average ICU Stay (days)', traditional: 7, criticalLink: 5 },
    { metric: 'Early Complication Detection', traditional: 60, criticalLink: 90 },
    { metric: 'Patient Satisfaction', traditional: 75, criticalLink: 95 },
    { metric: 'Cost Reduction (%)', traditional: 0, criticalLink: 30 },
  ]

  const emergencyResponseData = [
    { scenario: 'Cardiac Event', responseTime: 2.5 },
    { scenario: 'Respiratory Distress', responseTime: 1.8 },
    { scenario: 'Sudden BP Drop', responseTime: 1.5 },
    { scenario: 'Abnormal Lab Results', responseTime: 3.2 },
    { scenario: 'Patient Fall', responseTime: 1.2 },
  ]

  const costReductionData = [
    { category: 'Staff Optimization', reduction: 25 },
    { category: 'Early Intervention', reduction: 35 },
    { category: 'Reduced Length of Stay', reduction: 20 },
    { category: 'Preventive Care', reduction: 15 },
    { category: 'Efficient Resource Use', reduction: 30 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  return (
    <div className="flex flex-col min-h-screen font-sans ">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      {/* <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Brain className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">CriticalLink</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#analytics">
            Analytics
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#impact">
            Impact
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#testimonials">
            Testimonials
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#faq">
            FAQ
          </Link>
        </nav>
      </header> */}
      <main className="flex-1 text-gray-700">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-60  bg-gradient-to-r from-blue-100 via-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Revolutionizing ICU Care with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  CriticalLink: Step Down ICUs - Transforming healthcare with low-cost, high-efficiency AI-powered monitoring.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32  bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Activity className="h-8 w-8 text-blue-600" />}
                title="AI-Powered Monitoring"
                description="Continuous tracking of vital signs with predictive analytics."
              />
              <FeatureCard
                icon={<Video className="h-8 w-8 text-red-400" />}
                title="Video Analysis"
                description="AI-driven monitoring for patient movement and behavior."
              />
              <FeatureCard
                icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
                title="Early Warning System"
                description="Predict and prevent complications before they occur."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Resource Optimization"
                description="Efficient allocation of nursing hours and ICU usage."
              />
              <FeatureCard
                icon={<Smile className="h-8 w-8 text-pink-400" />}
                title="AI Chatbot Support"
                description="24/7 AI-powered conversation for patient mental health."
              />
              <FeatureCard
                icon={<Home className="h-8 w-8 text-orange-400" />}
                title="Home Care Integration"
                description="Extend monitoring capabilities to home scenarios."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-green-400" />}
                title="Real-time Alerts"
                description="Instant notifications for critical changes in patient status."
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8 text-red-500" />}
                title="Data Security"
                description="HIPAA-compliant encryption and access control."
              />
              <FeatureCard
                icon={<Clock className="h-8 w-8 text-violet-500" />}
                title="Predictive Analytics"
                description="Forecast patient outcomes and resource needs."
              />
              <FeatureCard
                icon={<Smartphone className="h-8 w-8 text-black" />}
                title="Mobile Access"
                description="Secure remote access for healthcare providers."
              />
              <FeatureCard
                icon={<Clipboard className="h-8 w-8 text-primary" />}
                title="Automated Reporting"
                description="Generate comprehensive patient care reports."
              />
              <FeatureCard
                icon={<HeartPulse className="h-8 w-8 text-red-400" />}
                title="Customizable Alerts"
                description="Tailor alert thresholds to individual patient needs."
              />
            </div>
          </div>
        </section>

        <section id="analytics" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-4">
              <span className="bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
                Advanced Analytics
              </span>
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Empowering healthcare with data-driven insights
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-center">Patient Vitals Over 24 Hours</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={patientMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
                    <Line type="monotone" dataKey="breathingRate" stroke="#82ca9d" name="Breathing Rate" />
                    <Line type="monotone" dataKey="oxygenLevel" stroke="#ffc658" name="Oxygen Level" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-center">Sleep Pattern Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={sleepPatternData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="deepSleep" stackId="1" stroke="#8884d8" fill="#8884d8" name="Deep Sleep" />
                    <Area type="monotone" dataKey="lightSleep" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Light Sleep" />
                    <Area type="monotone" dataKey="awake" stackId="1" stroke="#ffc658" fill="#ffc658" name="Awake" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-center">Video Analytics: Patient Movement</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" name="Time" unit="h" />
                    <YAxis type="number" dataKey="y" name="Movement" unit="%" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Movement" data={[
                      { x: 0, y: 20 }, { x: 2, y: 10 }, { x: 4, y: 15 },
                      { x: 6, y: 30 }, { x: 8, y: 25 }, { x: 10, y: 40 },
                      { x: 12, y: 35 }, { x: 14, y: 20 }, { x: 16, y: 30 },
                      { x: 18, y: 25 }, { x: 20, y: 15 }, { x: 22, y: 20 },
                    ]} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-center">3D Plot: ICU Model Impact</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" name="Recovery Rate" unit="%" />
                    <YAxis type="number" dataKey="y" name="Cost Reduction" unit="%" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="Patient Satisfaction" unit="%" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Traditional ICU" data={[
                      { x: 70, y: 0, z: 200 }
                    ]} fill="#8884d8" />
                    <Scatter name="CriticalLink ICU" data={[
                      { x: 85, y: 30, z: 350 }
                    ]} fill="#82ca9d" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-4">
              <span className="bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
                Our Impact
              </span>
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Transforming ICU care with measurable results
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-center">ICU Performance Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={icuPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="traditional" stroke="#8884d8" name="Traditional ICU" />
                    <Line type="monotone" dataKey="criticalLink" stroke="#82ca9d" name="CriticalLink ICU" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-center">Emergency Response Time (minutes)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={emergencyResponseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="scenario" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="responseTime" fill="#8884d8" name="Response Time" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-center">Cost Reduction Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costReductionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="reduction"
                      label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                    >
                      {costReductionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-center">Market Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={marketGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} name="Market Value" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Healthcare Providers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TestimonialCard
                quote="CriticalLink has transformed our ICU operations. We're able to provide better care to more patients while significantly reducing costs."
                author="Dr. Priya Sharma"
                role="Chief of Intensive Care, Metro Hospital, Mumbai"
              />
              <TestimonialCard
                quote="The AI-powered early warning system has been a game-changer. We're catching complications before they become critical, saving lives in the process."
                author="Dr. Rajesh Patel"
                role="Head of Cardiology, City Medical Center, Delhi"
              />
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does CriticalLink improve patient care?</AccordionTrigger>
                <AccordionContent>
                  CriticalLink uses AI-powered monitoring to predict complications, enable early interventions, and optimize resource allocation. This leads to better patient outcomes, reduced ICU stays, and more efficient healthcare delivery.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is CriticalLink compatible with existing hospital systems?</AccordionTrigger>
                <AccordionContent>
                  Yes, CriticalLink is designed to integrate seamlessly with existing hospital information systems and medical devices. Our team provides full support for integration and staff training.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How does CriticalLink ensure patient privacy?</AccordionTrigger>
                <AccordionContent>
                  CriticalLink adheres to strict data protection standards, including HIPAA compliance. All patient data is encrypted, and access is restricted to authorized healthcare providers only.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can CriticalLink be used for home care?</AccordionTrigger>
                <AccordionContent>
                  Yes, CriticalLink offers home care solutions that allow for remote monitoring of patients. This enables early discharge from hospitals while maintaining high-quality care and reducing the risk of readmissions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-100 via-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your ICU?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join the healthcare revolution. Schedule a demo today and see how CriticalLink can enhance patient care in your facility.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit">Request Demo</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-400">© 2056 CriticalLink. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white">
      <div className="mb-3 p-2 bg-primary/10 rounded-full">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role }) {
  return (
    <div className="p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <p className="text-lg mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  )
}