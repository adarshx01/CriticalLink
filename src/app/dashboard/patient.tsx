'use client'
import React,{useState} from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts'
import { Coffee, Moon, Sun, AlertTriangle } from 'lucide-react'
const Patient = () => {
    const [selectedPatient, setSelectedPatient] = useState(null)
    const patients = [
        { id: 1, name: "John Doe", age: 45, admissionDate: "2023-09-15", condition: "Step-down", risk: "Low" },
        { id: 2, name: "Alice Johnson", age: 32, admissionDate: "2023-09-18", condition: "Post-operative", risk: "Medium" },
        { id: 3, name: "Bob Williams", age: 58, admissionDate: "2023-09-20", condition: "Step-up", risk: "High" },
        { id: 4, name: "Emma Brown", age: 27, admissionDate: "2023-09-22", condition: "Home care", risk: "Low" },
      ]


      const patientData = {
        id: 1,
        name: "John Doe",
        age: 45,
        condition: "Step-down",
        risk: "Low",
        vitalSigns: [
          { time: '00:00', heartRate: 72, respRate: 16, oxygenSat: 98 },
          { time: '04:00', heartRate: 75, respRate: 18, oxygenSat: 97 },
          { time: '08:00', heartRate: 68, respRate: 15, oxygenSat: 99 },
          { time: '12:00', heartRate: 70, respRate: 17, oxygenSat: 98 },
          { time: '16:00', heartRate: 73, respRate: 16, oxygenSat: 97 },
          { time: '20:00', heartRate: 71, respRate: 15, oxygenSat: 98 },
        ],
        sleepPattern: [
          { date: '2023-09-15', deepSleep: 3, lightSleep: 4, awake: 1 },
          { date: '2023-09-16', deepSleep: 4, lightSleep: 3, awake: 1 },
          { date: '2023-09-17', deepSleep: 3.5, lightSleep: 3.5, awake: 1 },
          { date: '2023-09-18', deepSleep: 4, lightSleep: 4, awake: 0.5 },
          { date: '2023-09-19', deepSleep: 3, lightSleep: 4, awake: 1.5 },
        ],
        intakeLog: [
          { time: '08:00', type: 'Water', amount: '250ml' },
          { time: '09:30', type: 'Food', amount: 'Breakfast' },
          { time: '12:00', type: 'Water', amount: '300ml' },
          { time: '13:00', type: 'Food', amount: 'Lunch' },
          { time: '16:00', type: 'Water', amount: '200ml' },
          { time: '18:30', type: 'Food', amount: 'Dinner' },
        ],
        aiPredictions: [
          { condition: 'Risk of Dehydration', probability: 0.15 },
          { condition: 'Sleep Apnea', probability: 0.08 },
          { condition: 'Potential Infection', probability: 0.03 },
        ],
      }
    
      const handlePatientClick = (patient) => {
        setSelectedPatient(patient)
      }


  return (
    <div>
            <Card>
                <CardHeader>
                <CardTitle>Monitored Patients</CardTitle>
                <CardDescription>Click on a patient to view detailed information</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Admission Date</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Risk Level</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {patients.map((patient) => (
                        <TableRow key={patient.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handlePatientClick(patient)}>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.admissionDate}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                        <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            patient.risk === 'Low' ? 'bg-green-200 text-green-800' :
                            patient.risk === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-red-200 text-red-800'
                            }`}>
                            {patient.risk}
                            </span>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>

          {/* Selected Patient Details */}
          {selectedPatient && (
            <Card>
              <CardHeader>
                <CardTitle>{patientData.name} - Detailed Information</CardTitle>
                <CardDescription>CriticalLink Patient Monitoring Data</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="vitals">
                  <TabsList>
                    <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
                    <TabsTrigger value="sleep">Sleep Pattern</TabsTrigger>
                    <TabsTrigger value="intake">Food/Water Intake</TabsTrigger>
                    <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="vitals">
                    <div className="w-full h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={patientData.vitalSigns}>
                          <XAxis dataKey="time" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
                          <Line yAxisId="left" type="monotone" dataKey="respRate" stroke="#82ca9d" name="Respiratory Rate" />
                          <Line yAxisId="right" type="monotone" dataKey="oxygenSat" stroke="#ffc658" name="Oxygen Saturation" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="sleep">
                    <div className="w-full h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={patientData.sleepPattern}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="deepSleep" stackId="a" fill="#8884d8" name="Deep Sleep" />
                          <Bar dataKey="lightSleep" stackId="a" fill="#82ca9d" name="Light Sleep" />
                          <Bar dataKey="awake" stackId="a" fill="#ffc658" name="Awake" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="intake">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patientData.intakeLog.map((entry, index) => (
                          <TableRow key={index}>
                            <TableCell>{entry.time}</TableCell>
                            <TableCell>
                              {entry.type === 'Water' ? <Coffee className="inline mr-2" /> : <Moon className="inline mr-2" />}
                              {entry.type}
                            </TableCell>
                            <TableCell>{entry.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="predictions">
                    <div className="space-y-4">
                      {patientData.aiPredictions.map((prediction, index) => (
                        <Card key={index}>
                          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">{prediction.condition}</CardTitle>
                            <AlertTriangle className={`w-4 h-4 ${
                              prediction.probability < 0.3 ? 'text-green-500' :
                              prediction.probability < 0.7 ? 'text-yellow-500' :
                              'text-red-500'
                            }`} />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{(prediction.probability * 100).toFixed(1)}%</div>
                            <Progress value={prediction.probability * 100} className="w-full" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
    </div>
  )
}

export default Patient
