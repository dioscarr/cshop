import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logo from './components/Logo'; // Added Logo import
import './App.css';
import BarberList from './BarberList';
import ServiceList from './ServiceList';
import ConfirmationPage from './ConfirmationPage';
import DateTimePicker from './DateTimePicker';
import Dashboard from './components/management/Dashboard';
import ManageAppointments from './components/management/ManageAppointments';
import { AuthProvider } from './contexts/AuthContext';
import { AppointmentProvider } from './contexts/AppointmentContext';
import { DatabaseProvider, useDatabase } from './contexts/DatabaseContext';
import Login from './components/management/Login';
import Layout from './components/management/Layout';
import ManageBarbers from './components/management/ManageBarbers';
import ManageServices from './components/management/ManageServices';
import Reports from './components/management/Reports';
import CheckoutPage from './components/checkout/CheckoutPage';
import CheckoutManagement from './components/management/CheckoutManagement';
import PaymentHistory from './components/management/PaymentHistory';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { getBarbers, getServices } = useDatabase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const [barbersData, servicesData] = await Promise.all([
          getBarbers(),
          getServices()
        ]);
        console.log('Barbers:', barbersData);
        console.log('Services:', servicesData);
        setBarbers(barbersData || []);
        setServices(servicesData || []);
      } catch (err) {
        console.error('Error details:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getBarbers, getServices]);

  const steps = [
    { number: 1, title: "Select Service" },
    { number: 2, title: "Choose Barber" },
    { number: 3, title: "Pick Date & Time" },
    { number: 4, title: "Confirm Booking" }
  ];

  const selectBarber = (barber) => {
    setSelectedBarber(barber);
    setCurrentStep(3);
  };

  const selectService = (service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const selectDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setCurrentStep(4);
  };

  const resetSelection = () => {
    setSelectedBarber(null);
    setSelectedService(null);
    setSelectedDateTime(null);
    setCurrentStep(1);
  };

  const canNavigateToStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return true; // Can always go back to first step
      case 2:
        return selectedService !== null; // Need service selected
      case 3:
        return selectedService !== null && selectedBarber !== null; // Need both service and barber
      case 4:
        return selectedService !== null && selectedBarber !== null && selectedDateTime !== null; // Need all selections
      default:
        return false;
    }
  };

  const handleStepClick = (stepNumber) => {
    if (canNavigateToStep(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const getStepSummary = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return selectedService ? `Service: ${selectedService.name}` : "Choose a service";
      case 2:
        return selectedBarber ? `Barber: ${selectedBarber.name}` : "Pick your barber";
      case 3:
        return selectedDateTime ? `Date & Time: ${new Date(selectedDateTime).toLocaleString()}` : "Schedule your appointment";
      case 4:
        return "Finalize your reservation"; // No specific summary for confirmation
      default:
        return "";
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Loading...</p>
      </div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-red-600">
        <p>Error loading data:</p>
        <p>{error}</p>
      </div>
    </div>;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900 dark:text-white">
        <AuthProvider>
          <DatabaseProvider>
            <AppointmentProvider>
              <Router>
                <Routes>
                  <Route path="/manage/login" element={<Login />} />
                  <Route path="/manage/*" element={
                    <Layout>
                      <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="appointments" element={<ManageAppointments />} />
                        <Route 
                          path="barbers" 
                          element={<ManageBarbers barbers={barbers} />} 
                        />
                        <Route 
                          path="services" 
                          element={<ManageServices services={services} />} 
                        />
                        <Route path="reports" element={<Reports />} />
                        <Route path="checkout" element={<CheckoutManagement />} />
                        <Route path="payments" element={<PaymentHistory />} />
                      </Routes>
                    </Layout>
                  } />
                  <Route 
                    path="/checkout" 
                    element={
                      <CheckoutPage 
                        selectedService={selectedService}
                        selectedBarber={selectedBarber}
                        selectedDateTime={selectedDateTime}
                      />
                    } 
                  />
                  <Route 
                    path="/" 
                    element={
                      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                        <header className="bg-white dark:bg-gray-800 shadow-sm">
                          <div className="container mx-auto px-4 py-4 flex items-center border-b dark:border-gray-700">
                            <Logo />
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white ml-4">
                              BookCut Appointments
                            </h1>
                          </div>
                          <div className="container mx-auto px-4 py-3">
                            <div className="flex flex-wrap items-center justify-center lg:justify-between gap-2 lg:gap-0 max-w-7xl mx-auto">
                              {steps.map((step) => (
                                <div key={step.number} 
                                  className="flex items-center flex-[1_1_150px] sm:flex-[1_1_180px] lg:flex-1 max-w-[200px] lg:max-w-none"
                                >
                                  <div className="flex items-center min-w-0 flex-1">
                                    <button
                                      onClick={() => handleStepClick(step.number)}
                                      disabled={!canNavigateToStep(step.number)}
                                      className={`flex items-center group space-x-2 min-w-0 w-full ${
                                        !canNavigateToStep(step.number) 
                                          ? 'cursor-not-allowed opacity-60' 
                                          : 'cursor-pointer hover:opacity-80'
                                      }`}
                                    >
                                      <div className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 ${
                                        currentStep === step.number 
                                          ? 'bg-blue-500 text-white ring-4 ring-blue-100' 
                                          : currentStep > step.number 
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                      }`}>
                                        {currentStep > step.number ? (
                                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                          </svg>
                                        ) : (
                                          step.number
                                        )}
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
                                          {step.title}
                                        </p>
                                        <p className="text-[10px] md:text-xs text-gray-500 truncate">
                                          {getStepSummary(step.number)}
                                        </p>
                                        {/* Mobile summary - only show when there's a selection */}
                                        {step.number !== 4 && (
                                          <p className="text-[10px] text-gray-500 truncate sm:hidden">
                                            {step.number === 1 && selectedService ? selectedService.name : ''}
                                            {step.number === 2 && selectedBarber ? selectedBarber.name : ''}
                                            {step.number === 3 && selectedDateTime ? new Date(selectedDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                          </p>
                                        )}
                                      </div>
                                    </button>
                                  </div>
                                  {step.number < 4 && (
                                    <div className="flex-shrink-0 mx-2 w-8 md:w-12 hidden lg:block">
                                      <div className={`h-0.5 w-full ${
                                        currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                                      }`}></div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </header>
                        
                        <main className="container mx-auto px-3 py-4">
                          {loading ? (
                            <div className="flex justify-center items-center h-64">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            </div>
                          ) : error ? (
                            <div className="text-center text-red-600 p-4">{error}</div>
                          ) : (
                            <>
                              {currentStep === 1 && (
                                <ServiceList services={services} selectService={selectService} />
                              )}
                              
                              {currentStep === 2 && (
                                <div>
                                  <h2 className="text-xl font-medium mb-4">Choose Your Barber</h2>
                                  <BarberList barbers={barbers} selectBarber={selectBarber} />
                                </div>
                              )}
                              
                              {currentStep === 3 && selectedService && selectedBarber && (
                                <div>
                                  <h2 className="text-xl font-medium mb-4">Pick Date & Time</h2>
                                  <DateTimePicker
                                    selectDateTime={selectDateTime}
                                    barberAvailability={selectedBarber.availability}
                                    serviceDuration={selectedService.duration}
                                  />
                                </div>
                              )}
                              
                              {currentStep === 4 && (
                                <ConfirmationPage
                                  selectedBarber={selectedBarber}
                                  selectedService={selectedService}
                                  selectedDateTime={selectedDateTime}
                                  resetSelection={resetSelection}
                                  setCurrentStep={setCurrentStep}
                                />
                              )}
                            </>
                          )}
                        </main>
                      </div>
                    } 
                  />
                </Routes>
                <ThemeToggle />
              </Router>
            </AppointmentProvider>
          </DatabaseProvider>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;