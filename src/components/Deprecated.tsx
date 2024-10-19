'use client';
import React, { useState } from 'react';
import { Activity, Video, AlertTriangle, Cpu, ArrowRight, Heart, Eye, Thermometer, Wind, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const DeprecatedLandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    { icon: <Cpu className="w-6 h-6" />, title: "AI Predictions", description: "Sensor-based accurate forecasting" },
    { icon: <Video className="w-6 h-6" />, title: "Video Analysis", description: "Advanced patient monitoring" },
    { icon: <Activity className="w-6 h-6" />, title: "Vital Tracking", description: "Comprehensive health monitoring" },
    { icon: <AlertTriangle className="w-6 h-6" />, title: "Real-time Alerts", description: "Instant critical notifications" },
    { icon: <Heart className="w-6 h-6" />, title: "Heart Rate Monitor", description: "Continuous cardiac activity tracking" },
    { icon: <Eye className="w-6 h-6" />, title: "Eye Open Time", description: "Sleep pattern analysis" },
    { icon: <Thermometer className="w-6 h-6" />, title: "Temperature Sensing", description: "Continuous body temperature monitoring" },
    { icon: <Wind className="w-6 h-6" />, title: "Respiratory Analysis", description: "Cough and sneeze detection" },
  ];

  const faqs = [
    { question: "How accurate are the AI predictions?", answer: "Our AI predictions have shown over 95% accuracy in clinical trials, leveraging advanced machine learning algorithms and real-time data analysis." },
    { question: "Is the system HIPAA compliant?", answer: "Yes, our system is fully HIPAA compliant, ensuring the privacy and security of all patient data." },
    { question: "Can the system integrate with existing hospital equipment?", answer: "Absolutely. Our system is designed to seamlessly integrate with a wide range of existing ICU equipment and EHR systems." },
    { question: "How does the video analysis protect patient privacy?", answer: "Our video analysis uses advanced anonymization techniques and does not store raw video data, ensuring patient privacy while still providing crucial monitoring capabilities." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">AI-Powered ICU Monitor</h1>
            <p className="text-xl mb-6">Revolutionizing patient care with cutting-edge AI technology</p>
            <Button size="lg" variant="secondary" className="font-semibold">Request Demo</Button>
          </div>
          <div className="mt-8 md:mt-0">
            <img src="/api/placeholder/500/300" alt="ICU Monitoring Dashboard" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Comprehensive Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center space-x-2">
                  <div className="bg-blue-100 p-2 rounded-full">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md mb-16">
          <h2 className="text-3xl font-bold mb-6">System Overview</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Capabilities:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Advanced heart rate and SpO2 monitoring with predictive analytics</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                  <span>AI-powered cough and sneeze detection for early symptom identification</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Comprehensive sleep pattern analysis using eye-open time tracking</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Real-time patient movement analysis and fall detection alerts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Intelligent shivering detection for temperature regulation monitoring</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg overflow-hidden">
              <img src="/api/placeholder/600/400" alt="System Dashboard" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Transform Your ICU Today</h2>
          <p className="mb-8 text-xl">Experience the future of patient care with our AI-powered monitoring system</p>
          <Button size="lg" variant="secondary" className="font-semibold">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm">Leading the revolution in AI-powered ICU monitoring systems, enhancing patient care and clinical outcomes.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300">Home</a></li>
                <li><a href="#" className="hover:text-blue-300">Features</a></li>
                <li><a href="#" className="hover:text-blue-300">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: info@aicumonitor.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 AI Street, Tech City, TC 12345</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 AI-Powered ICU Monitoring System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;